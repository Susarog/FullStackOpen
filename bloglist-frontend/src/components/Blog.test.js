import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {
  test('renders title and author but not url or likes', () => {
    const blog = {
      title: 'asdf',
      author: 'bruh',
      url: 'https://www.youtube.com',
    }
    render(<Blog blog={blog}/>)
    const element = screen.getByText('asdf bruh')

    expect(element).toBeDefined()
  })

  test('renders url and likes after button has been pressed', async () => {
    const blog = {
      user: {
        username: 'bruh',
      },
      title: 'asdf',
      author: 'bruh',
      url: 'https://www.youtube.com',
      likes: 1
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const urlDiv = screen.getByText('https://www.youtube.com')
    expect(urlDiv).toBeDefined()
    const likesDiv = screen.getByText('likes 1')
    expect(likesDiv).toBeDefined()
  })

  test('updates amount of likes by pressing like button', async () => {
    const blog = {
      user: {
        username: 'bruh',
      },
      title: 'asdf',
      author: 'bruh',
      url: 'https://www.youtube.com',
      likes: 1
    }
    const mockHandler = jest.fn()

    render(<Blog blog={blog} updateLikes={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likesButton = screen.getByText('like')
    await user.click(likesButton)
    await user.click(likesButton)
    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})