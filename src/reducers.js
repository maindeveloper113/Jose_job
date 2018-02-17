import { combineReducers } from 'redux'
import {
  SELECT_CONTENT,
  INVALIDATE_CONTENT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  RECEIVE_SIZE
} from './actions'

function selectedContent(state = 'design', action) {
  switch (action.type) {
    case SELECT_CONTENT:
      return action.content
    default:
      return state
  }
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_CONTENT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsByContent(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_CONTENT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.content]: posts(state[action.content], action)
      })
    default:
      return state
  }
}

function selectedSize(state = 5, action) {
  switch(action.type) {
    case RECEIVE_SIZE:
      return action.size;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsByContent,
  selectedContent,
  selectedSize,
})

export default rootReducer
