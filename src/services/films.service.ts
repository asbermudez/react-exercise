import { Film } from '../types';
import xhrService from './xhr.service';

class FilmsService {
  readonly APIUrl = 'https://ghibliapi.herokuapp.com';

  async getFilms(): Promise<Film[]> {
    try {
      return xhrService.get(`${this.APIUrl}/films`);
    } catch (error) {
      throw Error(error);
    }
  }

  async getFilm(id: string): Promise<Film> {
    try {
      return xhrService.get(`${this.APIUrl}/films`, { id });
    } catch (error) {
      throw Error(error);
    }
  }
}

export default new FilmsService();
