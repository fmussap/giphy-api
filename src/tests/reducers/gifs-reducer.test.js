import gifsReducer from '../../reducers/gifs-reducer'

test('should set gifs data for SET_GIFS', () => {
  const gif = {
    data: 1,
    meta: 1,
    pagination: 1
  }

  const action = {
    type: 'SET_GIFS',
    ...gif
  }
  const state = gifsReducer({}, action)
  expect(state).toEqual(gif)
})
