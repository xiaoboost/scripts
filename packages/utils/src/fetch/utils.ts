export function fileReaderReady<T = any>(reader: FileReader) {
  return new Promise<T>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as any);
    reader.onerror = () => reject(reader.error);
  });
}

export function readBlobAsArrayBuffer(blob: Blob) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(blob);
  return fileReaderReady(reader);
}

export function readBlobAsText(blob: Blob) {
  const reader = new FileReader();
  reader.readAsText(blob);
  return fileReaderReady<string>(reader);
}

export const methods = ["GET", "HEAD", "POST"] as const;

export type Method = (typeof methods)[number];

export type Headers = Record<string, string>;

export function parseParams(body: string) {
  const form = new FormData();

  body.trim().split('&').forEach((bytes) => {
    if (bytes) {
      const split = bytes.split('=');
      const name = split.shift()!.replace(/\+/g, ' ');
      const value = split.join('=').replace(/\+/g, ' ');

      form.append(decodeURIComponent(name), decodeURIComponent(value));
    }
  });

  return form;
}

export function parseHeaders(responseHeaders: string) {
  const head: Headers = {};
  const pairs = responseHeaders.trim().split('\n');

  pairs.forEach((header) => {
    const split = header.trim().split(':');
    const key = split.shift()!.trim();
    const value = split.join(':').trim();
    head[key] = value;
  });

  return head;
}
