import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { getAllGifs, getGifsPage, setGifs } from '../../actions/gifs'

const mockStore = configureMockStore([thunk])

test(' setGifs should set data, meta and pagination action object', () => {
  const getState = {}
  const store = mockStore(getState)
  const data = {
    data: 1,
    meta: 1,
    pagination: 1
  }
  store.dispatch(setGifs(data))

  const actions = store.getActions()

  expect(actions[0]).toEqual({
    type: 'SET_GIFS',
    data: data.data,
    meta: data.meta,
    pagination: data.pagination
  })
})

test('getAllGifs should set data, meta and pagination as action object', async () => {
  const getState = {}
  const store = mockStore(getState)
  await store.dispatch(getAllGifs(1))
  const actions = store.getActions()
  expect(actions[0]).toEqual({
    type: 'SET_GIFS',
    data: expect.any(Array),
    meta: {
      status: 200,
      msg: 'OK',
      response_id: expect.any(String)
    },
    pagination: expect.any(Object)
  })
})

test('getGifsPage should set data, meta and pagination as action object using the given data', async () => {
  const getState = {}
  const store = mockStore(getState)
  await store.dispatch(getGifsPage('dogs', 1))
  const actions = store.getActions()
  expect(actions[0]).toEqual({
    type: 'SET_GIFS',
    data: expect.any(Array),
    meta: {
      status: 200,
      msg: 'OK',
      response_id: expect.any(String)
    },
    pagination: expect.any(Object)
  })
})
