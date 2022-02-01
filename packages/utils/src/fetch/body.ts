import { readBlobAsArrayBuffer, readBlobAsText } from './utils';
import { isString } from '@xiao-ai/utils';

export type BodyInput = string | Blob | FormData;

export class Body {
  private _bodyText?: string;
  private _bodyBuffer?: FormData;
  private _bodyBlob?: Blob;

  constructor(body: BodyInput) {
    if (isString(body)) {
      this._bodyText = body
    }
    else if (Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body as Blob;
    }
    else if (ArrayBuffer.prototype.isPrototypeOf(body)) {
      this._bodyBuffer = body as FormData;
    }
    else if (!body) {
      this._bodyText = ''
    }
    else {
      throw new Error('unsupported BodyInit type')
    }
  }

  blob() {
    if (this._bodyBlob) {
      return Promise.resolve(this._bodyBlob);
    }
    else if (this._bodyBuffer) {
      // TODO: arrayBuffer 转为 blob
      throw new Error('could not read ArrayBuffer body as blob');
    }
    else {
      return Promise.resolve(new Blob([this._bodyText ?? '']));
    }
  }

  arrayBuffer() {
    if (this._bodyBuffer) {
      return Promise.resolve(this._bodyBuffer);
    }
    else if (this._bodyBlob) {
      return this.blob().then(readBlobAsArrayBuffer);
    }
    else {
      // TODO: 字符串转为 arrauBuffer
    }
  }

  text(): Promise<string> {
    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob);
    }
    else if (this._bodyBuffer) {
      // TODO: arrayBuffer 转为字符串
      throw new Error('could not read ArrayBuffer body as text');
    }
    else {
      return Promise.resolve(this._bodyText ?? '');
    }
  }

  json() {
    return this.text().then(JSON.parse);
  }
}
