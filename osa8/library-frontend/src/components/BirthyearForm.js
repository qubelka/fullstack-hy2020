import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BirthYearForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editBirthyear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: error => {
      if (error.graphQLErrors[0]) {
        setError(error.graphQLErrors[0].message)
      } else {
        setError(error.message)
      }
    },
  })

  const submit = async event => {
    event.preventDefault()

    editBirthyear({
      variables: { name, setBornTo: parseInt(born) },
    })
    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('person not found')
    }
  }, [result.data]) // eslint-disable-line

  return (
    <div>
      <h2>set birth year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={e => setBorn(e.target.value)}
          />
        </div>

        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthYearForm
