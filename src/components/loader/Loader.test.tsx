import React from 'react';
import { mount } from 'enzyme';
import Loader, { LoadStatus } from './Loader';

jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

describe('Loader component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the spinner if the status is LOADING', () => {
    // GIVEN
    const wrapper = mount(<Loader status={LoadStatus.LOADING} />);

    // WHEN
    wrapper.update();

    // THEN
    expect(wrapper.find(`.loader.loader--${LoadStatus.LOADING}`).length).toBe(1);
    expect(wrapper.find('.loader__spinner').length).toBe(1);
    expect(wrapper.find('.loader__warning').length).toBe(0);
  });

  it('should render the warning if the status is ERROR', () => {
    // GIVEN
    const wrapper = mount(<Loader status={LoadStatus.ERROR} />);

    // WHEN
    wrapper.update();

    // THEN
    expect(wrapper.find(`.loader.loader--${LoadStatus.ERROR}`).length).toBe(1);
    expect(wrapper.find('.loader__spinner').length).toBe(0);
    expect(wrapper.find('.loader__warning').length).toBe(1);
  });

  it('should render only the wrapper if status is DONE', () => {
    // GIVEN
    const wrapper = mount(<Loader status={LoadStatus.DONE} />);

    // WHEN
    wrapper.update();

    // THEN
    expect(wrapper.find(`.loader.loader--${LoadStatus.DONE}`).length).toBe(1);
    expect(wrapper.find('.loader__spinner').length).toBe(0);
    expect(wrapper.find('.loader__warning').length).toBe(0);
  });
});
