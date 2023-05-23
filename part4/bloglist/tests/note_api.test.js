const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('../utils/testHelper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const initialBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    },
    {
      title: 'Wishfull thinking',
      author: 'Mr Gold Man',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
        
    }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})



test('there are two posts', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
  expect(response.headers).toMatchObject({
    'content-type': expect.stringContaining('application/json')
  })
})


test('blog post has a unique identifier named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
  expect(response.body[0].id).toBeDefined()
})

test('create new blog post successfully', async () => {
  const newBlog = {
    title: 'Joes diary',
    author: 'who is joe',
    url: 'joe mama',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(response.body.map(b => b.title)).toContain('Joes diary')
})

test('creating a new blog post with missing likes defaults to 0', async () => {
  const newBlog = {
    title: 'iloveu',
    author: 'Test iloveu',
    url: 'http://iloveu.com/test'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})


test('creating a new blog post without title returns 400 Bad Request', async () => {
  const newBlog = {
    author: 'Testing',
    url: 'test.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('creating a new blog post without url returns 400 Bad Request', async () => {
  const newBlog = {
    title: 'Testing',
    author: 't',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('deleting a blog post succeeds with a valid id', async () => {
  const newBlog = {
    title: 'Blog Post',
    author: 'Author',
    url: 'test',
    likes: 0
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogToDelete = response.body

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const response2 = await api.get('/api/blogs')
  expect(response2.body).toHaveLength(initialBlogs.length)
})

test('a blog post can be updated', async () => {
  const newBlog = {
    title: 'Testing',
    author: 'borna',
    url: 'www.google.fi',
    likes: 0
  }

  const addedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const updatedBlog = {
    ...addedBlog.body,
    likes: 1
  }

  await api
    .put(`/api/blogs/${addedBlog.body.id}`)
    .send(updatedBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedPost = blogsAtEnd.find(blog => blog.id === addedBlog.body.id)
  expect(updatedPost.likes).toBe(1)
})




describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  est('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    expect(result.body.error).toContain('expected `username` to be unique')
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })


})









afterAll(async () => {
  await mongoose.connection.close()
})