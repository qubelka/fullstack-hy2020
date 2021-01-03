import { uniq } from 'lodash'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'

const includedIn = (arr, object) => arr.map(book => book.id).includes(object.id)

export const getUniqueGenres = books => {
  let genres = []
  books.forEach(book => {
    genres.push(...book.genres)
  })
  return uniq(genres)
}

export const updateBooksInCache = (addedBook, cache) => {
  const dataInCache = cache.readQuery({ query: ALL_BOOKS })
  if (!dataInCache) return
  if (!includedIn(dataInCache.allBooks, addedBook)) {
    cache.writeQuery({
      query: ALL_BOOKS,
      data: { allBooks: dataInCache.allBooks.concat(addedBook) },
    })
  }
}

export const updateAuthorsInCache = (addedAuthor, cache) => {
  const dataInCache = cache.readQuery({ query: ALL_AUTHORS })
  if (!dataInCache) return
  if (!includedIn(dataInCache.allAuthors, addedAuthor)) {
    cache.writeQuery({
      query: ALL_AUTHORS,
      data: { allAuthors: dataInCache.allAuthors.concat(addedAuthor) },
    })
  }
}

export const updateRecommendationsInCache = (addedBook, cache) => {
  const cachedUser = cache.readQuery({ query: ME })
  if (
    !cachedUser ||
    !cachedUser.me ||
    !addedBook.genres.includes(cachedUser.me.favoriteGenre)
  ) {
    return
  }

  const cachedAllBooks = cache.readQuery({
    query: ALL_BOOKS,
    variables: { genre: cachedUser.me.favoriteGenre },
  })
  if (!cachedAllBooks) return

  if (!includedIn(cachedAllBooks.allBooks, addedBook)) {
    cache.writeQuery({
      query: ALL_BOOKS,
      variables: { genre: cachedUser.me.favoriteGenre },
      data: { allBooks: cachedAllBooks.allBooks.concat(addedBook) },
    })
  }
}
