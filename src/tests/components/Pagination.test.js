import React from 'react'
import { shallow } from 'enzyme'
import Pagination from '../../components/pagination'

let spy, wrapper
beforeEach(() => {
  spy = jest.fn()
  wrapper = shallow(<Pagination
    onClick={spy}
    total={5}
    activePage={3}
    max={1}
  />)
})

test('should render Pagination correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle onClick when prev', () => {
  wrapper.find('Page.prev').simulate('click')
  expect(spy).toHaveBeenLastCalledWith(2)
})

test('should handle onClick when next', () => {
  wrapper.find('Page.next').simulate('click')
  expect(spy).toHaveBeenLastCalledWith(4)
})
