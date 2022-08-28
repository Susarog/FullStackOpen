import { useDispatch, useSelector } from 'react-redux'
import { upVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = (props) => {
    const dispatch = useDispatch()
    const vote = () => {
        dispatch(upVote(props.anecdote))
        dispatch(setNotification(`you voted '${props.anecdote.content}'`, 5000))
      }
    return (
        <div>
              <div>
                {props.anecdote.content}
              </div>
              <div>
                has {props.anecdote.votes}
                <button onClick={() => vote(props.anecdote.id)}>vote</button>
              </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes) 
    const filter = useSelector(state => state.filter)
    return (
        anecdotes
        .filter(anecdote => anecdote.content.includes(filter))
        .map(anecdote => {
            return <Anecdote key={anecdote.id} anecdote={anecdote}/>
        })
    )
}

export default AnecdoteList

  