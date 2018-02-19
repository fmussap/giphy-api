import React from 'react'
import { shallow } from 'enzyme'
import Main from '../../components/Main'

test('should render NotFoundPage correctly', () => {
  const wrapper = shallow(<Main />)
  expect(wrapper).toMatchSnapshot()
})
