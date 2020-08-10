import { forEach as _forEach, reduce as _reduce } from 'lodash';

class XHRService {
  get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    return fetch(`${url}${this.getUrlParams(params)}`, { method: 'GET' })
      .then(this.handleResponseStatus)
      .then((response) => this.parseResponse<T>(response));
  }

  private handleResponseStatus(response: Response): Response {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  private parseResponse<T>(response: Response): Promise<T> {
    if (response.status === 204) {
      // 204 is an empty response so we return an empty promise
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return Promise.resolve() as Promise<any>;
    }
    return response.json();
  }

  private getUrlParams(params: Record<string, unknown> = {}): string {
    let urlParams = '';
    let separator = '?';
    _forEach(params, (param, key) => {
      if (param !== undefined) {
        urlParams = `${urlParams}${separator}${this.URIEncode(key, param)}`;
        separator = '&';
      }
    });
    return urlParams;
  }

  private URIEncode(key: string, param: unknown): string {
    if (Array.isArray(param)) {
      return _reduce(param, (query, item) => `${query}&${this.URIEncode(`${key}`, item)}`, '').replace(/^&/iu, '');
    }
    if (typeof param === 'object') {
      return _reduce(param, (query, value, prop) => `${query}&${this.URIEncode(`${key}[${prop}]`, value)}`, '').replace(
        /^&/iu,
        '',
      );
    }
    return `${key}=${encodeURIComponent(param as string | number | boolean)}`;
  }
}

export default new XHRService();
