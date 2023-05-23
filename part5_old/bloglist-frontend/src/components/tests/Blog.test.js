import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../Blog'
import BlogForm from '../BlogForm'
import blogService from '../../services/blogs'

const blog = {
  title: 'Test blog',
  author: 'Test author',
  url: 'http://testblog.com',
  likes: 5,
  id: '1'
}

const mockDeleteHandler = jest.fn()

test('renders title and author but not url or likes by default', () => {
  const component = render(
    <Blog blog={blog} handleDelete={mockDeleteHandler} />
  )

  expect(component.container).toHaveTextContent(
    'Test blog'
  )
  expect(component.container).toHaveTextContent(
    'Test author'
  )
  expect(screen.getByText('http://testblog.com')).not.toBeVisible()
  expect(screen.getByText('likes: 5')).not.toBeVisible()
})

test('renders url and likes when view button is clicked', () => {
  const component = render(
    <Blog blog={blog} handleDelete={mockDeleteHandler} />
  )

  const button = component.getByText('view')
  userEvent.click(button)

  expect(component.container).toHaveTextContent(
    'http://testblog.com'
  )
  expect(component.container).toHaveTextContent(
    'likes: 5'
  )
})

blogService.update = jest.fn()


test('clicking the like button twice calls the event handler twice', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'http://testblog.com',
    likes: 5,
    id: '1',
  }

  const handleDelete = jest.fn()

  render(
    <Blog blog={blog} handleDelete={handleDelete} />
  )

  const viewButton = screen.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = screen.getByTestId('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(blogService.update).toHaveBeenCalledTimes(2)
})




test('form calls the event handler with the right details when a new blog is created', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const createButton = component.getByText('create')

  const newBlog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 0,
  }

  fireEvent.change(titleInput, { target: { value: newBlog.title } })
  fireEvent.change(authorInput, { target: { value: newBlog.author } })
  fireEvent.change(urlInput, { target: { value: newBlog.url } })
  fireEvent.click(createButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith(newBlog)
})
