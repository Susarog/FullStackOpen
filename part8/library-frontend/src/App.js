import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Recommendation from './components/Recommendations'
import { BOOK_ADDED, ALL_AUTHORS, ALL_BOOKS, GET_USER } from './queries'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'

export const updateCache = (cache, query, addedPerson) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [message, setErrorMessage] = useState(null)
  const [genre, setGenre] = useState('')
  const books = useQuery(ALL_BOOKS, { variables: { genre: genre } })
  const authors = useQuery(ALL_AUTHORS)
  const user = useQuery(GET_USER)
  const client = useApolloClient()
  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if (token) {
      setToken(token)
    }
  }, [])
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} has been added`)
      return {
        allBooks: updateCache(client.cache, { query: ALL_BOOKS }, addedBook),
      }
    },
  })

  if (user.loading || books.loading || authors.loading) {
    return <div>loading...</div>
  }
  const logout = async () => {
    localStorage.clear()
    await client.resetStore()
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
          <button onClick={() => setPage('recommendation')}>
            recommendation
          </button>
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

      <Books
        show={page === 'books'}
        books={books.data.allBooks}
        setGenre={setGenre}
      />

      <NewBook show={page === 'add'} setError={notify} />

      <LoginForm
        setPage={setPage}
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
      />

      <Recommendation
        show={page === 'recommendation'}
        usersGenres={user.data.me}
        books={books.data.allBooks}
      />
    </div>
  )
}

export default App
