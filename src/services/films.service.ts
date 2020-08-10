import { Film } from '../types';
import xhrService from './xhr.service';

class FilmsService {
  readonly APIUrl = 'https://ghibliapi.herokuapp.com';

  async getFilms(): Promise<Film[]> {
    return xhrService.get<Film[]>(`${this.APIUrl}/films`);
  }

  async getFilm(id: string): Promise<Film> {
    return xhrService.get<Film>(`${this.APIUrl}/films/${id}`);
  }
}

export default new FilmsService();
