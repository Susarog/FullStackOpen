import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { useQuery } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [message, setErrorMessage] = useState(null)
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  if (books.loading || authors.loading) {
    return <div>loading...</div>
  }
  if (books.error) return `Error! ${books.error.message}`
  const logout = () => {
    localStorage.clear()
    setToken(null)
    setPage('login')
  }
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <button onClick={() => setPage('add')}>add book</button>
        ) : null}
        {token ? (
          <button onClick={() => logout()}>logout</button>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <Notification message={message} />
      <Authors
        show={page === 'authors'}
        authors={authors.data.allAuthors}
        token={token}
      />

      <Books show={page === 'books'} books={books.data.allBooks} />

      <NewBook show={page === 'add'} token={token} />

      <LoginForm
        setPage={setPage}
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
      />
    </div>
  )
}

export default App
