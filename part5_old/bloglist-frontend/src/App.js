import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogOut = async (event) => {
    event.preventDefault()

    setUser(null)
    setUsername('')
    setPassword('')
    window.localStorage.removeItem(
      'loggedBlogappUser',JSON.stringify(user)
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,password
      })

      window.localStorage.setItem(
        'loggedBlogappUser',JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

      setErrorMessage('You have logged in!')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    } catch (exception){
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }


  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs([...blogs, returnedBlog])
      })
      .catch(error => {
        console.log(error)
      })

    setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const handleDelete = async (id) => {
    if (!user) {
      setErrorMessage('You are not authorized to delete blogs')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    const blogToDelete = blogs.find((blog) => blog.id === id)
    if (!blogToDelete) {
      return
    }
    console.log(blogToDelete)
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }
  }

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    logoutButton: {
      marginLeft: '10px',
      backgroundColor: '#F44336',
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      padding: '8px 16px',
      cursor: 'pointer',
    },
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Blogs</h2>
      <Notification message={errorMessage} />

      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }

      {user &&
        <div>
          <p>{user.name} logged in
            <button style={styles.logoutButton} type="logout" onClick={handleLogOut}>
              Logout
            </button>
          </p>

          <p>
          </p>
          <Togglable buttonLabel="create a new blog">
            <BlogForm createBlog={addBlog} handleDelete/>
          </Togglable>
        </div>
      }

      <div style={{ marginTop: '20px' }}>
        {sortedBlogs.map(blog => (
          <div key={blog.id} style={{ display: 'flex', alignItems: 'center' }}>
            <Blog blog={blog} handleDelete={handleDelete} />
          </div>
        ))}
      </div>

    </div>
  )
}


export default App