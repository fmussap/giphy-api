import React from 'react'
import { shallow } from 'enzyme'
import PageContent from '../../components/PageContent'

let spy, wrapper
beforeEach(() => {
  spy = jest.fn()
  const data = {
    urlStill: 'http:/test/still',
    urlModal: 'http:/test',
    title: 'Any title',
    src: 'http:/test/src',
    handleOpenModal: spy
  }
  wrapper = shallow(<PageContent
    {...data}
  />)
})

test('should render Page correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle onClick', () => {
  wrapper.find('div.individual-gif-container').simulate('click')
  expect(spy).toHaveBeenLastCalledWith('http:/test', 'Any title')
  expect(wrapper.state().hover).toBe('no-hover')
})

test('should handle onMouseOver', () => {
  wrapper.find('div.individual-gif-container').simulate('mouseOver')
  expect(wrapper.state().src).toBe('http:/test/src')
})

test('should handle onMouseOut', () => {
  wrapper.find('div.individual-gif-container').simulate('mouseOut')
  expect(wrapper.state().src).toBe('http:/test/still')
})
