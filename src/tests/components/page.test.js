import React from 'react'
import { shallow } from 'enzyme'
import Page from '../../components/pagination'

let spy, wrapper
beforeEach(() => {
  spy = jest.fn()
  wrapper = shallow(<Page
    onClick={spy}
    page={1}
    pageLink={'a'}
  />)
})

test('should render Page correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle onClick', () => {
  wrapper.find('Page').at(0).simulate('click')
  expect(spy).toHaveBeenLastCalledWith(1)
})
