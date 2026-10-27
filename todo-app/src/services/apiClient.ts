import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import type { IApiErrorResponse, IApiTokenResponse } from './types';

const базовыйUrl = '/api';
const ключТокена = 'токенАвторизации';
const ключКэша = 'кэшApi';
const времяЖизниКэша = 30_000;

interface IЗаписьКэша {
  срокДействия: number;
  данные: unknown;
}

const получитьТокен = (): string | null => localStorage.getItem(ключТокена);
const сохранитьТокен = (токен: string): void => localStorage.setItem(ключТокена, токен);

const получитьКэш = <T>(ключ: string): T | null => {
  const сохраненныйКэш = sessionStorage.getItem(`${ключКэша}:${ключ}`);

  if (!сохраненныйКэш) {
    return null;
  }

  try {
    const запись = JSON.parse(сохраненныйКэш) as IЗаписьКэша;

    if (запись.срокДействия <= Date.now()) {
      sessionStorage.removeItem(`${ключКэша}:${ключ}`);
      return null;
    }

    return запись.данные as T;
  } catch {
    sessionStorage.removeItem(`${ключКэша}:${ключ}`);
    return null;
  }
};

const сохранитьКэш = <T>(ключ: string, данные: T): void => {
  const запись: IЗаписьКэша = {
    срокДействия: Date.now() + времяЖизниКэша,
    данные,
  };

  sessionStorage.setItem(`${ключКэша}:${ключ}`, JSON.stringify(запись));
};

const клиент: AxiosInstance = axios.create({
  baseURL: базовыйUrl,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

клиент.interceptors.request.use((конфигурация: InternalAxiosRequestConfig) => {
  const токен = получитьТокен();

  if (токен) {
    конфигурация.headers.Authorization = `Bearer ${токен}`;
  }

  return конфигурация;
});

клиент.interceptors.response.use(
  (ответ) => ответ,
  async (ошибка: AxiosError<IApiErrorResponse>) => {
    const исходныйЗапрос = ошибка.config as (InternalAxiosRequestConfig & { повторен?: boolean }) | undefined;

    if (ошибка.response?.status === 401 && исходныйЗапрос && !исходныйЗапрос.повторен) {
      исходныйЗапрос.повторен = true;
      const ответТокена = await axios.get<IApiTokenResponse>('/api/auth/token');
      сохранитьТокен(ответТокена.data.token);
      исходныйЗапрос.headers.Authorization = `Bearer ${ответТокена.data.token}`;
      return клиент.request(исходныйЗапрос);
    }

    throw ошибка;
  },
);

const выполнитьСПовторами = async <T>(
  запрос: () => Promise<T>,
  количествоПопыток = 3,
): Promise<T> => {
  let последняяОшибка: unknown;

  for (let попытка = 0; попытка < количествоПопыток; попытка += 1) {
    try {
      return await запрос();
    } catch (ошибка) {
      последняяОшибка = ошибка;

      if (попытка < количествоПопыток - 1) {
        await new Promise<void>((разрешить) => setTimeout(разрешить, 300 * (попытка + 1)));
      }
    }
  }

  throw последняяОшибка;
};

export const apiClient = {
  get: async <T>(путь: string, сигнал?: AbortSignal): Promise<T> => {
    const кэш = получитьКэш<T>(путь);

    if (кэш) {
      return кэш;
    }

    const ответ = await выполнитьСПовторами(() => клиент.get<T>(путь, сигнал ? { signal: сигнал } : undefined));
    сохранитьКэш(путь, ответ.data);
    return ответ.data;
  },
  post: async <T, D>(путь: string, данные: D, сигнал?: AbortSignal): Promise<T> => {
    const ответ = await выполнитьСПовторами(() => клиент.post<T>(путь, данные, сигнал ? { signal: сигнал } : undefined));
    return ответ.data;
  },
  patch: async <T, D>(путь: string, данные: D, сигнал?: AbortSignal): Promise<T> => {
    const ответ = await выполнитьСПовторами(() => клиент.patch<T>(путь, данные, сигнал ? { signal: сигнал } : undefined));
    return ответ.data;
  },
  delete: async (путь: string, сигнал?: AbortSignal): Promise<void> => {
    await выполнитьСПовторами(() => клиент.delete(путь, сигнал ? { signal: сигнал } : undefined));
  },
  сохранитьТокен,
};



