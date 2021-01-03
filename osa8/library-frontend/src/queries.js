import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id
    name
    born
    bookCount
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      ...AuthorDetails
    }
    id
    genres
  }
  ${AUTHOR_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription BookAdded {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query AllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
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
