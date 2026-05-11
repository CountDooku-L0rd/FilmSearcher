export interface IErrorPayload {
  status: number;
  data: IError;
}

interface IError {
  success: false;
  errorMessage: string;
}