import { Response } from "./response";
import { parseHeaders } from './utils';

export function fetch(input: string, init: Omit<Tampermonkey.Request, 'url'> = {}) {
  return new Promise<Response>(function (resolve, reject) {
    const xhr_details: Tampermonkey.Request = {
      ...init,
      url: input,
    };

    xhr_details.onload = (resp) => {
      const status = resp.status;

      if (status < 100 || status > 599) {
        reject(new TypeError("Network request failed"));
        return;
      }

      const rawRespHeaders = resp.responseHeaders;
      const parsedRespHeaders = parseHeaders(rawRespHeaders);
      const resource = init.responseType ? resp.response : resp.responseText;

      resolve(
        new Response(resource, {
          status: status,
          statusText: resp.statusText,
          headers: parsedRespHeaders,
          url: resp.finalUrl ?? parsedRespHeaders["X-Request-URL"] ?? "",
        })
      );
    };

    xhr_details.onerror = () => {
      reject(new TypeError("Network request failed"));
    };

    GM_xmlhttpRequest(xhr_details);
  });
}
