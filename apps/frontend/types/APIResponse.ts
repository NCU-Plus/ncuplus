export interface APIResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
}
