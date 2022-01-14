import { BodyInput, Body } from './body';
import { Headers } from './utils';

interface ResponseOptions {
  url: string;
  status: number;
  statusText: string;
  headers: Headers;
}

export class Response extends Body implements ResponseOptions {
  type: string;
  url: string;
  ok: boolean;
  status: number;
  statusText: string;
  headers: Headers;

  constructor(bodyInit: BodyInput, options: ResponseOptions) {
    super(bodyInit);

    this.type = "default";
    this.url = options.url ?? "";
    this.status = options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText;
    this.headers = options.headers;
  }
}
