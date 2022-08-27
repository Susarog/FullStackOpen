import { useDispatch } from 'react-redux'
import { postAnecdote } from '../reducers/anecdoteReducer'
import { postNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const newAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(postAnecdote(anecdote))
        dispatch(postNotification(`you posted '${anecdote}'`))
        setTimeout(()=> {
            dispatch(removeNotification())
        }, 5000)
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