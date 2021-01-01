import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query AllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation AddBook(
    $title: String!
    $authorName: String!
    $authorBorn: Int
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      authorName: $authorName
      authorBorn: $authorBorn
      published: $published
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query Me {
    me {
      username
      favoriteGenre
    }
  }
`
