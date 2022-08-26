import { useDispatch, useSelector } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'



const Anecdote = (props) => {
    const dispatch = useDispatch()
    const vote = (id) => {
        dispatch(updateVotes(id))
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
    const anecdotes = useSelector(state => state) 
    return (
        anecdotes.map(anecdote => {
            return <Anecdote key={anecdote.id} anecdote={anecdote}/>
        })
    )
}

export default AnecdoteList

  