import React from 'react';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import App from './App';

describe('App.js tests', () => {

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  it('Should display an error when it does not get the stuff', async () => {
    fetchMock.get('/api/v1/groceries', {
      status: 500
    });

    const wrapper = mount(<App/>);

    await wrapper.update();

    expect(wrapper.state('errorStatus')).toEqual('Error fetching groceries');
    expect(wrapper.find('.error').length).toEqual(1);

  })
});
