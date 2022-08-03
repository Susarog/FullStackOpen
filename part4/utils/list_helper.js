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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}