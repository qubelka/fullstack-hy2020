const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const isEmpty = blogs => blogs.length === 0

const totalLikes = blogs => {
  return blogs.map(blog => blog.likes)
    .reduce((sum, likes) => {
      return sum + likes
    }, 0)
}

const favoriteBlog = blogs => {
  if (isEmpty(blogs)) {
    return {}
  } else {
    const favoriteBlog = _.maxBy(blogs, 'likes')
    return (({ author, likes, title }) => ({ author, likes, title }))(favoriteBlog)
  }
}

const mostBlogs = blogs => {
  if (isEmpty(blogs)) {
    return {}
  } else {
    return _.flow(
      () => _.countBy(blogs, 'author'),
      _.toPairs,
      _.max,
      (authorWithMostBlogs) => {
        return {
          author: authorWithMostBlogs[0],
          blogs: authorWithMostBlogs[1]
        }
      }
    )(blogs)
  }
}

const mostLikes = blogs => {
  if (isEmpty(blogs)) {
    return {}
  } else {
    return _.flow(
      () => _.groupBy(blogs, 'author'),
      blogsGroupedByAuthor => _.map(blogsGroupedByAuthor, (value, key) => {
        return {
          author: key,
          likes: _.sumBy(value, 'likes')
        }
      }),
      totalLikesByAuthor => _.maxBy(totalLikesByAuthor, 'likes')
    )(blogs)
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

