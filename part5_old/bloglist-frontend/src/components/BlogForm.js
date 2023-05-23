import { useState } from 'react'



const BlogForm = ({ createBlog }) => {

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }


  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      'title': title,
      'author': author,
      'url': url,
      'likes': 0,
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <div>
          Title: <input id="title" value={title} onChange={handleTitleChange} />

      </div>
      <div>
          Author: <input id="author" value={author} onChange={handleAuthorChange} />

      </div>

      <div>
          url: <input id="url" value={url} onChange={handleUrlChange} />

      </div>
      <button id="create" type="submit">create</button>
    </form>
  )

}


export default BlogForm