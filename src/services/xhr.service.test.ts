import xhrService from './xhr.service';

describe('XHRService', () => {
  describe('get()', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    const mockDataReturn = ['foo', 'bar', 'foobar'];

    const mockEmptyResponse: Partial<Response> = {
      ok: true,
      status: 204,
    };

    const mockResponse: Partial<Response> = {
      ok: true,
      status: 200,
      json: jest.fn(() => Promise.resolve(mockDataReturn)),
    };

    const mockRejectedResponse: Partial<Response> = {
      ok: false,
      status: 500,
      statusText: 'mockError',
    };

    it('should call fetch with the passed url', async () => {
      // GIVEN
      const url = 'mockURL';
      const expectedRequestInit: RequestInit = { method: 'GET' };
      jest.spyOn(global, 'fetch').mockResolvedValue(Promise.resolve(mockEmptyResponse as Response));

      // WHEN
      await xhrService.get(url);

      // THEN
      expect(global.fetch).toHaveBeenCalledWith(url, expectedRequestInit);
    });

    it('should return the parsed data from response', async () => {
      // GIVEN
      const url = 'mockURL';
      jest.spyOn(global, 'fetch').mockResolvedValue(Promise.resolve(mockResponse as Response));

      // WHEN
      const response = xhrService.get(url);

      // THEN
      await expect(response).resolves.toEqual(mockDataReturn);
    });

    it('should return void promise on 204 response', async () => {
      // GIVEN
      const url = 'mockURL';
      jest.spyOn(global, 'fetch').mockResolvedValue(Promise.resolve(mockEmptyResponse as Response));

      // WHEN
      const response = xhrService.get(url);

      // THEN
      await expect(response).resolves.toBeUndefined();
    });

    it('should reject and return response statusText if reponse is not ok', async () => {
      // GIVEN
      const url = 'mockURL';
      jest.spyOn(global, 'fetch').mockResolvedValue(Promise.resolve(mockRejectedResponse as Response));

      // WHEN
      const response = xhrService.get(url);

      // THEN
      await expect(response).rejects.toEqual(new Error(mockRejectedResponse.statusText));
    });
  });
});
