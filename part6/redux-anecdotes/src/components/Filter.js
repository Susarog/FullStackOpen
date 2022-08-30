import { connect } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (event) => {
        props.updateFilter(event.target.value)
    }
    const style = {
      marginBottom: 10
    }
    
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
}
  

export default connect(null, { updateFilter })(Filter)