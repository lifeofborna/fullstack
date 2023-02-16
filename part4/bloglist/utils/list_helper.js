const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    sum = 0
    for (let i = 0; i < blogs.length; i++){
        sum += blogs[i].likes
    }
    return sum

}


const favoriteBlog = (blogs) => {
    sum = 0
    let fav = {}

    if (blogs.length === 0) {
        return fav;
    }

    for (let i = 0; i < blogs.length; i++){
        if (sum === 0 || blogs[i].likes > sum){
            fav = {
                title: blogs[i].title,
                author: blogs[i].author,
                likes: blogs[i].likes
            }
            
            sum = blogs[i].likes
        }

    }
    return fav
}

const mostBlogs = (blogs) => {
    const authors = {};
  
    for (const blog of blogs) {
      if (authors[blog.author]) {
        authors[blog.author] += 1;
      } else {
        authors[blog.author] = 1;
      }
    }
  
    let maxAuthor = null
    let maxCount = 0
    for (const author in authors) {
      if (authors[author] > maxCount) {
        maxAuthor = author
        maxCount = authors[author]
      }
    }
  
    return { author: maxAuthor, blogs: maxCount }
  }

const mostLikes = (blogs) => {
    const likes = {}
  
    for (const blog of blogs) {
      if (likes[blog.author]) {
        likes[blog.author] += blog.likes
      } else {
        likes[blog.author] = blog.likes
      }
    }
  
    let maxAuthor = null
    let mostLikes = 0
    for (const author in likes) {
      if (likes[author] > mostLikes) {
        maxAuthor = author
        mostLikes = likes[author]
      }
    }
  
    return { author: maxAuthor, likes: mostLikes }
  }




module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }