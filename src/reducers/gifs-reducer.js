import * as actions from '../actions/type'
export default (state = {}, action) => {
  switch (action.type) {
    case actions.SET_GIFS:
      return {
        data: action.data,
        meta: action.meta,
        pagination: action.pagination
      }
    default:
      return state
  }
}
