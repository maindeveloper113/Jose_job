import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_CONTENT = 'SELECT_CONTENT'
export const INVALIDATE_CONTENT = 'INVALIDATE_CONTENT'
export const RECEIVE_SIZE = 'RECEIVE_SIZE'

export function selectContent(content) {
  return {
    type: SELECT_CONTENT,
    content
  }
}

export function selectSize(size) {
  return {
    type: RECEIVE_SIZE,
    size
  }
}

export function invalidateContent(content) {
  return {
    type: INVALIDATE_CONTENT,
    content
  }
}

function requestPosts(content) {
  return {
    type: REQUEST_POSTS,
    content
  }
}

function receivePosts(content, size, json) {
  return {
    type: RECEIVE_POSTS,
    content,
    size,
    posts: json.articles,
    receivedAt: Date.now()
  }
}

function fetchPosts(content, size) {
  return dispatch => {
    dispatch(requestPosts(content))
    
    const callApi1 = new Promise((resolve) => {
      fetch(`https://newsapi.org/v2/everything?q=${content}&pageSize=${size}&apiKey=1b82488a0e2145eea6c06d156187e078`)
      .then(response => response.json()).then(json => resolve(json));
    });
    
    const callApi2 = new Promise((resolve) => {
      fetch(`https://newsapi.org/v2/everything?q=china&pageSize=${size}&apiKey=1b82488a0e2145eea6c06d156187e078`)
      .then(response => response.json()).then(json => resolve(json));
    });
    
    Promise.all([callApi1, callApi2]).then(result => {
      //---- result[0] is api1 result ----
      console.log("=================== api1 result:", result[0]);
      //---- result[1] is api2 result ----
      console.log("=================== api2 result:", result[1]);
      
      
      dispatch(receivePosts(content, size, result[0])); 
    })
  }
}

function shouldFetchPosts(state, content, size) {
  const posts = state.postsByContent[content]
  if (!posts || posts.length !== size) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(content, size) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), content,size)) {
      return dispatch(fetchPosts(content, size))
    }
  }
}
