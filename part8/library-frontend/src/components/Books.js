import React from 'react'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const books = props.books

  const filteredGenres = () => {
    let uniqueGenre = []
    const genres = books
      .map((book) => {
        return book.genres
      })
      .flat(1)

    genres.forEach((genre) => {
      if (!uniqueGenre.includes(genre)) {
        uniqueGenre.push(genre)
      }
    })
    return uniqueGenre
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {filteredGenres().map((a) => (
          <button key={a} onClick={() => props.setGenre(a)}>
            {a}
          </button>
        ))}
        <button key='allGenres' onClick={() => props.setGenre('')}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books
