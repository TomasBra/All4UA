export class HttpResponse<T>{
  status: string;
  count: number;
  items: Array<T>;
  data: T;
  messages: Array<string>;
}
