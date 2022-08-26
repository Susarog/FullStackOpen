const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const updateVotes = (id) => {
  return {
    type: 'UPDATE_VOTES',
    data: { id }
  }
}

export const postAnecdote = (anecdote) => {
  return {
    type: 'POST_ANECDOTE',
    content: anecdote,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) { 
    case 'UPDATE_VOTES': {
      const anecdote = state.find(anecdote => anecdote.id === action.data.id)
      const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
      return state = state.map(anecdote => newAnecdote.id === anecdote.id ? newAnecdote : anecdote).sort((a,b) => b.votes - a.votes)
    }
    case 'POST_ANECDOTE': {
      const newAnecdote = {
        content: action.content,
        id: getId(),
        votes: 0
      }
      return state = state.concat(newAnecdote)
    }
    default: return state
  }
}

export default reducer