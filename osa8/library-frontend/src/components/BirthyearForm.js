import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { EDIT_AUTHOR } from '../queries'
import { updateAuthorsInCache } from '../helper'

const BirthYearForm = ({ setError, authors }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')

  const [editBirthyear] = useMutation(EDIT_AUTHOR, {
    onError: error => {
      if (error.graphQLErrors[0]) {
        setError(error.graphQLErrors[0].message, 'error')
      } else {
        setError(error.message, 'error')
      }
    },
    update: (cache, { data: { editAuthor } }) => {
      updateAuthorsInCache(editAuthor, cache)
    },
  })

  const submit = async event => {
    event.preventDefault()

    if (!selectedOption) {
      setError('Please select the author', 'error')
      return
    }

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
