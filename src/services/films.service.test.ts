import filmsService from './films.service';
import { Film } from '../types';
import xhrService from './xhr.service';

describe('FilmsService', () => {
  const mockFilm: Film = {
    id: 'some',
    title: 'mockTitle',
    description: 'mockDescription',
    director: 'mockDirector',
    producer: 'mockProducer',
    release_date: 'mockReleaseDate',
    rt_score: 'mockScore',
    locations: [],
    people: [],
    species: [],
    vehicles: [],
    url: '',
  };
  describe('getFilms', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return a list of films after calling to the proper url', async () => {
      // GIVEN
      const list: Film[] = [
        { ...mockFilm, id: '123456' },
        { ...mockFilm, id: '654321' },
      ];
      jest.spyOn(xhrService, 'get').mockResolvedValue(Promise.resolve(list));

      // WHEN
      const results = filmsService.getFilms();

      // THEN
      await expect(results).resolves.toEqual(list);
      expect(xhrService.get).toHaveBeenCalledWith(`${filmsService.APIUrl}/films`);
    });

    it('should throw error if the URL call gets rejected', async () => {
      // GIVEN
      const expectedError = Error('mockError');
      jest.spyOn(xhrService, 'get').mockRejectedValue(expectedError);

      // WHEN
      const results = filmsService.getFilms();

      // THEN
      await expect(results).rejects.toEqual(expectedError);
    });
  });

  describe('getFilm', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return a film with the passed ID calling to the proper url', async () => {
      // GIVEN
      const mockId = 'mockId';
      jest.spyOn(xhrService, 'get').mockResolvedValue(Promise.resolve(mockFilm));

      // WHEN
      const results = filmsService.getFilm(mockId);

      // THEN
      await expect(results).resolves.toEqual(mockFilm);
      expect(xhrService.get).toHaveBeenCalledWith(`${filmsService.APIUrl}/films/${mockId}`);
    });

    it('should throw error if the URL call gets rejected', async () => {
      // GIVEN
      const expectedError = Error('mockError');
      jest.spyOn(xhrService, 'get').mockRejectedValue(expectedError);

      // WHEN
      const results = filmsService.getFilm('mockId');

      // THEN
      await expect(results).rejects.toEqual(expectedError);
    });
  });
});
