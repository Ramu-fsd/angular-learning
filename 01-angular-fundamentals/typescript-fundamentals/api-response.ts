export interface ApiSuccess<T> {
  readonly kind: 'success';
  readonly data: T;
  readonly correlationId: string;
}

export interface ApiFailure {
  readonly kind: 'failure';
  readonly code: string;
  readonly message: string;
  readonly correlationId: string;
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export function unwrapData<T>(result: ApiResult<T>): T {
  if (result.kind === 'failure') {
    throw new Error(`${result.code}: ${result.message}`);
  }

  return result.data;
}

export function isApiFailure<T>(
  result: ApiResult<T>
): result is ApiFailure {
  return result.kind === 'failure';
}
