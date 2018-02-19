import React from 'react'
import { shallow } from 'enzyme'
import { DashboardPage } from '../../components/DashboardPage'

let spy, wrapper
beforeEach(() => {
  spy = jest.fn()
  wrapper = shallow(<DashboardPage
    getAllGifs={spy}
    getGifsPage={spy}
  />)
})

test('should render DashboardPage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle handleClickAll on the All button', () => {
  wrapper.find('button.all').simulate('click')
  expect(spy).toHaveBeenLastCalledWith(1, 25)
})

test('should handle handleFilterGifs on the Cats button', () => {
  wrapper.find('button.cats').simulate('click')
  expect(spy).toHaveBeenLastCalledWith('cat', 1)
})

test('should handle handleFilterGifs on the Dogs button', () => {
  wrapper.find('button.dogs').simulate('click')
  expect(spy).toHaveBeenLastCalledWith('dog', 1)
})

test('handleSearchGifs should set a new search on input change', () => {
  const value = 'New search'
  wrapper.find('input').simulate('change', {
    target: { value }
  })
  expect(wrapper.state('name')).toBe(value)
})

test('should handle handleCopyLink', () => {
  const link = 'http://test/src'
  wrapper.setState({ src: link })
  wrapper.find('div.copy-link').simulate('click')
  expect(wrapper.state().src).toBe(link)
})
