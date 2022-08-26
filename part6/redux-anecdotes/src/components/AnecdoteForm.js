import { useDispatch } from 'react-redux'
import { postAnecdote } from '../reducers/anecdoteReducer'
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const newAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
    
        dispatch(postAnecdote(anecdote))
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name='anecdote' /></div>
                <button>create</button>
            </form>
        </div>
    )
  }
  
  export default AnecdoteForm