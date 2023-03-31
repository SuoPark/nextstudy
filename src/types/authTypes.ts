import { IAdminInfoState } from "@/hooks/useAdminInfo";

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  userId: string;
  password: string;
};

export type RegisterParams = {
  email: string;
  username: string;
  password: string;
};

export type UserDataType = IAdminInfoState;

export type AuthValuesType = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  logout: () => void;
  isInitialized: boolean;
  user: UserDataType | null;
  setUser: (value: UserDataType | null) => void;
  setIsInitialized: (value: boolean) => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void;
  refreshToken: (payload: { userId: string; refreshToken: string }) => void;
};

export type UserDataTypeBefore = {
  id: number;
  role: string;
  email: string;
  fullName: string;
  username: string;
  password: string;
  avatar?: string | null;
};
