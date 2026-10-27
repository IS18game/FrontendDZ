export interface IApiErrorResponse {
  error?: string;
  message?: string;
}

export interface IApiTodo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  userId: number;
  tagIds: number[];
}

export interface IApiUser {
  id: number;
  name: string;
}

export interface IApiTag {
  id: number;
  name: string;
}

export interface IApiTokenResponse {
  token: string;
  tokenType: string;
}

export interface ILoginRequest {
  name: string;
}

export interface IUserSettingsResponse {
  compactMode: boolean;
}
