import React from 'react';
import { mount } from 'enzyme';
import FilmList from './FilmList';
import { mockFilm } from '../../mocks';
import filmsService from '../../services/films.service';
import { executeAsync } from '../../test-utils';
import { LoadStatus } from '../loader/Loader';

describe('FilmList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the film and render it on load', async () => {
    // GIVEN
    const mockFilmList = [mockFilm, { ...mockFilm, id: '123456' }];
    jest.spyOn(filmsService, 'getFilms').mockResolvedValue(Promise.resolve(mockFilmList));
    const wrapper = mount(<FilmList />);
    expect(wrapper.find(`.loader.loader--${LoadStatus.LOADING}`).length).toBe(1);

    // WHEN
    await executeAsync();
    wrapper.update();

    // THEN
    expect(wrapper.find(`.loader.loader--${LoadStatus.DONE}`).length).toBe(1);
    expect(filmsService.getFilms).toHaveBeenCalled();
    expect(wrapper.find('.film-row:not(.film-list__header)').length).toBe(mockFilmList.length);
  });

  it.skip('should not render rows if fetching fails', async () => {
    // GIVEN
    jest.spyOn(filmsService, 'getFilms').mockRejectedValue(Promise.reject());
    const wrapper = mount(<FilmList />);

    // GIVEN
    await executeAsync();
    wrapper.update();

    // THEN
    expect(wrapper.find(`.loader.loader--${LoadStatus.ERROR}`).length).toBe(1);
    expect(wrapper.find('.film-row').length).toBe(0);
  });

  it('should show the film detail modal if clicked in a row', async () => {
    // GIVEN
    jest.spyOn(filmsService, 'getFilms').mockResolvedValue(Promise.resolve([mockFilm]));
    const wrapper = mount(<FilmList />);
    await executeAsync();
    wrapper.update();
    expect(wrapper.find('.film-detail').length).toBe(0);

    // WHEN
    wrapper.find('.film-row:not(.film-list__header)').simulate('click');

    // THEN
    expect(wrapper.find('.film-detail').length).toBe(1);
  });
});
