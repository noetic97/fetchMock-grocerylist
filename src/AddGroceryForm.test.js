import React from 'react';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import AddGroceryForm from './AddGroceryForm';


describe('AddGroceryForm', () => {

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  })

  const mockGroceries = [
    {id: 1, name: 'pineapple', quantity: 100},
    {id: 2, name: 'apple', quantity: 15},
    {id: 3, name: 'pear', quantity: 20}
  ]

  it('submits the correct data to the server', () => {

    fetchMock.post('/api/v1/groceries', {
      status: 200,
      body: JSON.stringify({ grocery: mockGroceries }),
      headers:{ "Content-Type": "application/json" }
    })

    const mockFn = jest.fn()

    const wrapper = mount(<AddGroceryForm updateGroceryList={ mockFn } />)

    const nameInput = wrapper.find('input[name="name"]')
    const qtyInput = wrapper.find('input[name="quantity"]');
    const formElement = wrapper.find('form');

    nameInput.simulate('change', {target: { value: 'tacos', name: 'name'} });
    qtyInput.simulate('change', {target: { value: '1000', name: 'quantity'} });
    formElement.simulate('submit');

    expect(fetchMock.called()).toEqual(true);
    expect(fetchMock.lastUrl()).toEqual('/api/v1/groceries');
    expect(fetchMock.lastOptions()).toEqual({
      method: 'POST',
      body: '{"grocery":{"name":"tacos","quantity":"1000"}}',
      headers: { 'Content-Type': 'application/json' }
    });
  })
})
