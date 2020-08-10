import { FilmDTO } from '../types';
import xhrService from './xhr.service';

class FilmsService {
  readonly APIUrl = 'https://ghibliapi.herokuapp.com';

  async getFilms(): Promise<FilmDTO[]> {
    return xhrService.get<FilmDTO[]>(`${this.APIUrl}/films`);
  }

  async getFilm(id: string): Promise<FilmDTO> {
    return xhrService.get<FilmDTO>(`${this.APIUrl}/films/${id}`);
  }
}

export default new FilmsService();
