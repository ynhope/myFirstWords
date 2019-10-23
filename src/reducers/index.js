import { combineReducers } from 'redux'

const initialState = {
  query: '',
  chats: [],
  videoUrlContainer: []
}

function queryReducer(state = initialState.query, action) {
  switch (action.type) {
    case 'CHAT_DATA_LOAD': return false
    case 'LOADING_ON': return true
    default: return state
  }
}

function chatsReducer(state = initialState.chats, action) {
  switch (action.type) {
    case 'CHAT_DATA_LOAD': return action.dataChats
    default: return state
  }
}

function videoUrlContainerReducer(state = initialState.videoUrlContainer, action) {
  switch (action.type) {
    case 'CHAT_LIST_DATA_LOAD': return action.datavideoUrlContainer
    default: return state
  }
}

export default combineReducers({
  query: queryReducer,
  chats: chatsReducer,
  videoUrlContainer: videoUrlContainerReducer,
})
