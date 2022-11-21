import React from 'react'
const Recommendation = (props) => {
  if (!props.show) {
    return null
  }
  const books = props.books
  const genre = props.usersGenres.favouriteGenre
  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre {`${genre}`}</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => {
              for (let i = 0; i < book.genres.length; i++) {
                if (book.genres[i] === genre) {
                  return true
                }
              }
              return false
            })
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendation
