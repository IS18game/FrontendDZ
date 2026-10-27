import { apiClient } from './apiClient';
import type { IApiTokenResponse, IApiUser, ILoginRequest } from './types';

export const authService = {
  login: async (запрос: ILoginRequest): Promise<IApiTokenResponse> => {
    void запрос;
    const ответ = await apiClient.get<IApiTokenResponse>('/auth/token');
    apiClient.сохранитьТокен(ответ.token);
    return ответ;
  },
  register: async (запрос: ILoginRequest): Promise<IApiTokenResponse> => authService.login(запрос),
  refreshToken: async (): Promise<IApiTokenResponse> => authService.login({ name: 'Пользователь' }),
  проверитьУникальностьEmail: async (email: string): Promise<boolean> => {
    const пользователи = await apiClient.get<IApiUser[]>('/users');
    return !пользователи.some((пользователь) => пользователь.name.toLowerCase() === email.toLowerCase());
  },
};
