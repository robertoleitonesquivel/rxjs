export interface Response<T> {
  Success: boolean;
  Message: string;
  Content: T;
}
