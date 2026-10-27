import { apiClient } from './apiClient';
import type { IApiTokenResponse, IApiUser, ILoginRequest } from './types';

export const authService = {
  login: async (запрос: ILoginRequest): Promise<IApiTokenResponse> => {
    void запрос;
    if (import.meta.env.PROD) {
      return { token: 'demo', tokenType: 'Bearer' };
    }
    const ответ = await apiClient.get<IApiTokenResponse>('/auth/token');
    apiClient.сохранитьТокен(ответ.token);
    return ответ;
  },
  register: async (запрос: ILoginRequest): Promise<IApiTokenResponse> => authService.login(запрос),
  refreshToken: async (): Promise<IApiTokenResponse> => authService.login({ name: 'Пользователь' }),
  проверитьУникальностьEmail: async (email: string): Promise<boolean> => {
    if (import.meta.env.PROD) return true;
    const пользователи = await apiClient.get<IApiUser[]>('/users');
    return !пользователи.some((пользователь) => пользователь.name.toLowerCase() === email.toLowerCase());
  },
};
