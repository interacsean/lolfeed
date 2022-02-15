export type ApiErrResponse<T = any> = {
  message: string,
  errors?: T[],
}
