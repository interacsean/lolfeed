import { Errable } from 'errable';
import { ApiErrResponse } from './ApiErrResponse';

export type ApiErrorOr<T, U = any> = Errable<ApiErrResponse<U>, T>;
