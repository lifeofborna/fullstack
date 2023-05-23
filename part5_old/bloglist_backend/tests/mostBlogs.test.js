const listHelper = require('../utils/list_helper')

describe('mostBlogs which author has the most blogs', () => {

    const listWithManyBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'WESTSIDEEEEEEE',
            author: 'A boogie wit da hoodie',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 2,
            __v: 0
        },

        {
            _id: 'I love u',
            title: 'Rockstar Lifestyle',
            author: 'A boogie wit da hoodie',
            url: 'youtube.com/aboogiewitdahoodie',
            likes: 300,
            __v: 0
        }
    ]
  
    test('Mostblogs by author should be:', () => {
        correctAns = {
            author:'A boogie wit da hoodie',
            blogs: 2
        }

        const result = listHelper.mostBlogs(listWithManyBlogs)
        expect(result).toEqual(correctAns)
      })

  })