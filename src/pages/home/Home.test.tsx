import React from 'react';
import { mount } from 'enzyme';
import Home from './Home';

jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

describe('Home page', () => {
  it('should have the right title and the film list component', async () => {
    // GIVEN
    const wrapper = mount(<Home />);

    // THEN
    expect(wrapper.find(`.home__title`).text()).toBe('Ghibli film DB');
    expect(wrapper.find(`.film-list`).length).toBe(1);
  });
});
