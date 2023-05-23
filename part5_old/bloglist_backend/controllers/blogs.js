const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require("../models/user")

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{username: 1, name: 1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})



blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const blogId = request.params.id

    const decodedToken = jwt.verify(request.token, process.env.SECRET) 
    
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'invalid or missing token' })
    }

    const blog = await Blog.findById(blogId)

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== decodedToken.id) {
      return response.status(401).json({ error: 'unauthorized access' })
    }

    await Blog.findByIdAndRemove(blogId)

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body
  
    const blog = {
      likes: body.likes
    }
  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (updatedBlog) {
      response.json(updatedBlog.toJSON())
    } else {
      response.status(404).end()
    }
  })

module.exports = blogRouter