export interface ILoginResponse {
  data: {
    token: string;
  };
  error: string;
  message: string;
  status: number;
}
