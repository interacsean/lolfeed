import { Errable } from 'errable';

export type ApiErrorOr<T, U = any> = Errable<U, T>