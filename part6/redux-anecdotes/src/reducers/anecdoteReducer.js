import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
      postAnecdote(state, action) {
        const anecdote = action.payload
        state.push(anecdote)
      },
      updateVotes(state, action) {
        const anecdote = state.find(anecdote => anecdote.id === action.payload)
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