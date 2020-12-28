import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BirthYearForm = ({ setError, authors }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')

  const [editBirthyear] = useMutation(EDIT_AUTHOR, {
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
      variables: { name: selectedOption.value, setBornTo: parseInt(born) },
    })
    setBorn('')
  }

  const options = authors.map(author => {
    return {
      value: author.name,
      label: author.name,
    }
  })

  return (
    <div>
      <h2>set birth year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            options={options}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
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
