import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
      postAnecdote(state, action) {
        const anecdote = action.payload
        state.push(anecdote)
      },
      updateVotes(state, action) {
        const anecdote = state.find(anecdote => anecdote.id === action.payload.id)

        const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
        return state = state.map(anecdote => newAnecdote.id === anecdote.id ? newAnecdote : anecdote).sort((a,b) => b.votes - a.votes)
      },
      setAnecdotes(state, action) {
        return action.payload
      }
    }
})

export const { postAnecdote, updateVotes, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer


export const createAnecdote =  (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(postAnecdote(newAnecdote))
  }
}

export const upVote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const updatedVoteAnecdote = await anecdoteService.updateVote(newAnecdote, anecdote.id)
    dispatch(updateVotes(updatedVoteAnecdote))
  }
}