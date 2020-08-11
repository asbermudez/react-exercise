import React from 'react';
import { mount } from 'enzyme';
import FilmDetail from './FilmDetail';
import { mockFilm } from '../../mocks';
import filmsService from '../../services/films.service';
import { executeAsync } from '../../test-utils';
import { LoadStatus } from '../loader/Loader';

describe('FilmDetail component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the film and render it on load', async () => {
    // GIVEN
    const mockId = 'mockId';
    jest.spyOn(filmsService, 'getFilm').mockResolvedValue(Promise.resolve(mockFilm));
    const wrapper = mount(<FilmDetail id={mockId} onClose={jest.fn()} />);
    expect(wrapper.find(`.loader.loader--${LoadStatus.LOADING}`).length).toBe(1);

    // WHEN
    await executeAsync();
    wrapper.update();

    // THEN
    expect(filmsService.getFilm).toHaveBeenCalledWith(mockId);
    expect(wrapper.find('#title').text()).toBe(`${mockFilm.title} (${mockFilm.release_date})`);
    expect(wrapper.find('#director').text()).toBe(`Director${mockFilm.director}`);
    expect(wrapper.find('#producer').text()).toBe(`Producer${mockFilm.producer}`);
    expect(wrapper.find('#description').text()).toBe(`Description${mockFilm.description}`);
    expect(wrapper.find('#rating').text()).toBe(`Rating${mockFilm.rt_score}/100`);
  });

  it.skip('should not render if fetching fails', async () => {
    // GIVEN
    jest.spyOn(filmsService, 'getFilm').mockRejectedValue(Promise.reject());
    const wrapper = mount(<FilmDetail id="mockId" onClose={jest.fn()} />);

    // GIVEN
    await executeAsync();
    wrapper.update();

    // THEN
    expect(wrapper.find('#title').length).toBe(0);
    expect(wrapper.find('#director').length).toBe(0);
    expect(wrapper.find('#producer').length).toBe(0);
    expect(wrapper.find('#description').length).toBe(0);
    expect(wrapper.find('#rating').length).toBe(0);
  });

  it('should call onClose prop if button closed or background are clicked', async () => {
    // GIVEN
    const onClose = jest.fn();
    jest.spyOn(filmsService, 'getFilm').mockResolvedValue(Promise.resolve(mockFilm));
    const wrapper = mount(<FilmDetail id="mockId" onClose={onClose} />);
    await executeAsync();
    wrapper.update();

    // WHEN
    wrapper.find('#close').simulate('click');
    wrapper.find('#background').simulate('click');

    // THEN
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
