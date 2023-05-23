import { useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleDelete }) => {
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
  }

  const titleStyle = {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  }

  const buttonStyle = {
    backgroundColor: 'white',
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  }

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: likes + 1 }
    await blogService.update(blog.id, updatedBlog)
    setLikes(updatedBlog.likes)
  }



  return (
    <div data-testid='blog' style={blogStyle}>
      <div style={{ flexGrow: 1 }}>
        <div style={titleStyle}>{blog.title}</div>
        <Togglable id='view' data-testid='view' buttonLabel="view">
          <div>{blog.author}</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flexGrow: 1 }}>likes: {likes}</div>
            <button id='like' data-testid='like' style={buttonStyle} onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.url}</div>
          <button id='delete' onClick={() => handleDelete(blog.id)}>delete</button>
        </Togglable>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog
