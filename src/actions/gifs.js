import fetch from 'isomorphic-fetch'

import { giphyKey } from '../config/keys'
import * as actions from './type'

// async func to get the last trending GIFS without a filter
export const getAllGifs = (page, max) => {
  return async dispatch => {
    let offset = page === 1 ? page : ((page - 1) * max) + 1
    console.log('giphyKey', giphyKey)
    console.log('GIPHY_API_KEY', process.env.GIPHY_API_KEY)
    const url = `http://api.giphy.com/v1/gifs/trending?&offset=${offset}&api_key=${giphyKey}`

    return fetch(url, {
      method: 'GET'
    })
    .catch(err => {
      console.log('fetch image error', err)
    })
    .then(data => {
      if (data) {
        return data.json()
      } else {
        throw (new Error())
      }
    })
    .then(parseData => {
      dispatch(setGifs(parseData))
    })
  }
}

// async func to search the last trending GIFS with a filter
export const getGifsPage = (type, page, max) => {
  return async dispatch => {
    let offset = page === 1 ? page : ((page - 1) * max) + 1
    const url = `http://api.giphy.com/v1/gifs/search?q=${type}&offset=${offset}&api_key=${giphyKey}`

    return fetch(url, {
      method: 'GET'
    })
    .catch(err => {
      console.log('fetch image error', err)
    })
    .then(data => {
      if (data) {
        return data.json()
      } else {
        throw (new Error())
      }
    })
    .then(parseData => {
      dispatch(setGifs(parseData))
    })
  }
}

export const setGifs = (data) => {
  return ({
    type: actions.SET_GIFS,
    data: data.data,
    meta: data.meta,
    pagination: data.pagination
  })
}
