import InputField from "./InputField";
import React from "react";

const BlogForm = ({ blog, handleBlogSubmit, handleBlogChange }) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleBlogSubmit}>
        <InputField
          value={blog.title || ''}
          name='title'
          onChange={handleBlogChange}
          placeholder='title'
        />
        <InputField
          value={blog.author || ''}
          name='author'
          onChange={handleBlogChange}
          placeholder='author'
        />
        <InputField
          value={blog.url || ''}
          name='url'
          onChange={handleBlogChange}
          placeholder='url'
        />
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm