import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BOOKYEAR, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [setBookYear] = useMutation(SET_BOOKYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  })
  if (!props.show) {
    return null
  }
  const authors = props.authors
  const addBookYear = async (event) => {
    event.preventDefault()
    const tempYear = parseInt(year)
    setBookYear({ variables: { name, setBornTo: tempYear } })
    setName('')
    setYear('')
  }

  const selectAuthor = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={addBookYear}>
        <div>
          <select value={name} onChange={selectAuthor}>
            {authors.map((a) => {
              return (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          year
          <input
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
