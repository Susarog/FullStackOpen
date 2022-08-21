import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('check if new blog has been created after submitting', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const title = container.querySelector('#title-input')
    const author = container.querySelector('#author-input')
    const url = container.querySelector('#url-input')

    const sendButton = screen.getByText('create')
    await user.type(title, 'dummytitle')
    await user.type(author, 'ryan')
    await user.type(url, 'https://www.youtube.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('dummytitle')
    expect(createBlog.mock.calls[0][0].author).toBe('ryan')
    expect(createBlog.mock.calls[0][0].url).toBe('https://www.youtube.com')
  })
})