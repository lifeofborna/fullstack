
import { combineReducers } from 'redux'
import filterReducer from './filterReducer'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdote = state.find(n => n.id === id)
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      ).sort((a, b) => b.votes - a.votes) 
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default:
      return state
  }
}

export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = content => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      votes: 0,
      id: Math.random()
    }
  }
}

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

export default rootReducer
