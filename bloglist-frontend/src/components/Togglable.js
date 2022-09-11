import { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { setVisible } from '../reducers/togglableReducer'
import { useSelector, useDispatch } from 'react-redux'
const Togglable = forwardRef((props, refs) => {
  const dispatch = useDispatch()
  const visible = useSelector((state) => state.togglableVisible)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    dispatch(setVisible())
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
