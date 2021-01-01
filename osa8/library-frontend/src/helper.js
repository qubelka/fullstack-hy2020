import { uniq } from 'lodash'

export const getUniqueGenres = books => {
  let genres = []
  books.forEach(book => {
    genres.push(...book.genres)
  })
  return uniq(genres)
}
