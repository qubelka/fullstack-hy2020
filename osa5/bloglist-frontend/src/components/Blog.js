import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailedView, setDetailedView] = useState(false)

  if (!detailedView) {
    return (
      <div className='blog'>
        {blog.title} {blog.author}
        <button onClick={() => setDetailedView(true)}>view</button>
      </div>
    )
  } else {
    return (
      <div className='blog'>
        {blog.title}
        <button onClick={() => setDetailedView(false)}>hide</button> <br/>
        {blog.url} <br/>
        {blog.likes}
        <button>like</button> <br/>
        {blog.author}
      </div>
    )
  }
}

export default Blog
