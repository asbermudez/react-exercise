import React from 'react';
import { forEach as _forEach, keys as _keys } from 'lodash';
import { mount } from 'enzyme';
import FilmRow from './FilmRow';
import { mockFilm } from '../../mocks';
import { Film } from '../../types';

jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

describe('FilmDetail component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render only the columns passed', async () => {
    // GIVEN
    const columns: Partial<Record<keyof Film, string>> = {
      title: '',
      description: '',
      director: '',
    };
    const wrapper = mount(<FilmRow film={mockFilm} columns={columns} onClick={jest.fn()} />);

    // WHEN
    wrapper.update();

    // THEN
    _forEach(mockFilm, (value, key) => {
      expect(wrapper.find(`.film-row__cell--${key}`).length).toBe(
        _keys(columns).some((column) => column === key) ? 1 : 0,
      );
    });
  });

  it('should render selected if selected is equal to id', async () => {
    // GIVEN
    const wrapper = mount(<FilmRow film={mockFilm} columns={{}} onClick={jest.fn()} selected={mockFilm.id} />);

    // WHEN
    wrapper.update();

    // THEN
    expect(wrapper.find('.film-row.film-row--selected').length).toBe(1);
  });

  it('should call onClick prop if row is clicked', async () => {
    // GIVEN
    const onClick = jest.fn();
    const wrapper = mount(<FilmRow film={mockFilm} columns={{}} onClick={onClick} />);
    wrapper.update();

    // WHEN
    wrapper.find('.film-row').simulate('click');

    // THEN
    expect(onClick).toHaveBeenCalled();
  });
});
