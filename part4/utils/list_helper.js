const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const arrOfLikes = blogs.map((blog) => blog.likes)
  return arrOfLikes.length === 0 ? 0 : arrOfLikes.reduce((sum,init) => sum + init)

}

const favoriteBlog = (blogs) => {
  return blogs.length === 0 ? null : blogs.reduce((high, val) => high.likes > val.likes ? high : val)
}

const mostBlogs = (blogs) => {
  const blogMap = new Map()
  blogs.forEach(element => {
    blogMap.set(element.author, blogMap.get(element.author) + 1 || 1)
  })
  const blogVal = Math.max(...blogMap.values())
  let authorOfBlog
  for (const [key, value] of blogMap) {
    if(value === blogVal){
      authorOfBlog = key.toString()
    }
  }
  console.log({
    author: authorOfBlog,
    blogs: blogVal
  })
  if(!authorOfBlog || !blogVal){
    return null
  }
  return {
    author: authorOfBlog,
    blogs: blogVal
  }
}

const mostLikes = (blogs) => {
  const blogMap = new Map()
  blogs.forEach(element => {
    blogMap.set(element.author, blogMap.get(element.author) + element.likes || element.likes)
  })
  const likeVals = Math.max(...blogMap.values())
  let authorOfBlog
  for (const [key, value] of blogMap) {
    if(value === likeVals){
      authorOfBlog = key.toString()
    }
  }
  if(!authorOfBlog || !likeVals){
    return null
  }
  return {
    author: authorOfBlog,
    likes: likeVals
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}