import { apiClient } from './apiClient';
import type { IApiUser, IUserSettingsResponse } from './types';

export const userService = {
  profile: async (сигнал?: AbortSignal): Promise<IApiUser> => apiClient.get<IApiUser>('/users/1', сигнал),
  settings: async (сигнал?: AbortSignal): Promise<IUserSettingsResponse> =>
    apiClient.get<IUserSettingsResponse>('/users/1/settings', сигнал),
};
