
import { AxiosError } from 'axios';

export class ApiError extends Error {
  status?: number;
  code?: string;
  payload?: any;

  constructor(message: string, status?: number, payload?: any) {
    super(message);
    this.status = status;
    this.payload = payload;
  }

  static badRequest(error: AxiosError<any>) {
    return new ApiError(
      error.response?.data?.message ?? 'Bad Request',
      400,
      error.response?.data
    );
  }

  static unauthorized(error: AxiosError<any>) {
    return new ApiError(
      'Unauthorized',
      401,
      error.response?.data
    );
  }

  static forbidden(error: AxiosError<any>) {
    return new ApiError(
      'Forbidden',
      403,
      error.response?.data
    );
  }

  static serverError(error: AxiosError<any>) {
    return new ApiError(
      'Internal Server Error',
      500,
      error.response?.data
    );
  }

  static unknown(error: AxiosError<any>) {
    return new ApiError(
      error.message ?? 'Unknown Error'
    );
  }
}
