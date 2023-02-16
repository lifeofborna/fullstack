const listHelper = require('../utils/list_helper')

describe('the author, whose blog posts have the largest amount of likes ', () => {

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
  
    test('Author whose blog post have most likes, return should be::', () => {
        correctAns = {
            author:'A boogie wit da hoodie',
            likes: 302
        }

        const result = listHelper.mostLikes(listWithManyBlogs)
        expect(result).toEqual(correctAns)
      })

  })