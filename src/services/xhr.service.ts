class XHRService {
  get<T>(url: string): Promise<T> {
    return fetch(url, { method: 'GET' })
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
}

export default new XHRService();
