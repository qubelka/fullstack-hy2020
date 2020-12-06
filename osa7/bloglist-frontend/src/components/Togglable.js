import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { toggleVisibility } from '../actions/togglable-actions'
import { Button } from 'react-bootstrap'

const Togglable = props => {
  const dispatch = useDispatch()
  const visible = useSelector(store => store.togglable)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant='info'
          size='sm'
          onClick={() => dispatch(toggleVisibility())}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant='info'
          size='sm'
          onClick={() => dispatch(toggleVisibility())}
        >
          cancel
        </Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
