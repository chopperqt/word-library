import supabase from "./client"

import type {
  CreateWord,
  UpdateWord,
  Word,
  WordID,
} from "models/Library.models"
import type { UserID } from "models/Auth.models"
import { store } from "services/stores"
import { setWords } from "services/library/Library.store"
import { loadingController } from "helpers/loadingController"
import { setAmountOfPages } from "services/pagination/Pagination.store"

const LIBRARY_TABLE = 'library'

export type LibraryRequests =
  'createLibraryWord' |
  'getLibraryWords' |
  'updateLibraryWord' |
  'updatePin' |
  'deleteLibraryWords'

export const createLibraryWord = async (wordData: CreateWord): Promise<Word[] | null> => {
  const {
    handleSetError,
    handleSetPending,
    handleSetSuccess,
  } = loadingController('createLibraryWord')

  handleSetPending()

  const {
    data,
    error,
  } = await supabase
    .from(LIBRARY_TABLE)
    .insert(wordData)

  if (error || !data) {
    handleSetError()

    return null
  }

  handleSetSuccess()

  return data
}

export const updateLibraryWord = async (wordData: UpdateWord): Promise<Word[] | null> => {
  const {
    handleSetError,
    handleSetPending,
    handleSetSuccess,
  } = loadingController('updateLibraryWord')

  handleSetPending()

  const {
    pined,
    translate,
    word,
    userID,
    wordID,
  } = wordData

  const {
    data,
    error,
  } = await supabase
    .from(LIBRARY_TABLE)
    .update({
      pined,
      translate,
      word,
    })
    .match({
      userID,
      id: wordID,
    })


  if (error || !data) {
    handleSetError()

    return null
  }

  handleSetSuccess()

  return data
}

export const getLibraryWords = async (userID: UserID, from:number = 0, to:number = 70): Promise<Word[] | null> => {
  const {
    handleSetError,
    handleSetPending,
    handleSetSuccess,
  } = loadingController('getLibraryWords')

  handleSetPending()

  console.log(from ,to)

  const {
    data,
    error,
    count,
  } = await supabase
    .from(LIBRARY_TABLE)
    .select('*', { count: 'exact' })
    .limit(70)
    .order('word')
    .range(from, to)
    .match({ userID })

  if (error || !data || !count) {
    handleSetError()

    return null
  }

  const amountOfPages = Math.round(count / 70)

  store.dispatch(setWords(data))
  store.dispatch(setAmountOfPages(amountOfPages))

  handleSetSuccess()

  return data
}

export const deleteLibraryWords = async (userID: UserID, word: string) => {
  const {
    handleSetError,
    handleSetPending,
    handleSetSuccess,
  } = loadingController('deleteLibraryWords')

  handleSetPending()

  const {
    data,
    error,
  } = await supabase
    .from(LIBRARY_TABLE)
    .delete()
    .match({
      userID,
      word,
    })

  if (error || !data) {
    handleSetError()

    return
  }

  handleSetSuccess()

  // TODO нужно посмотреть что вернут запрос и добавить тип который возвращает фукнция
  return data
}

export const updatePin = async (userID: UserID, pined: boolean, word: string): Promise<Word[] | null> => {
  const {
    handleSetError,
    handleSetPending,
    handleSetSuccess,
  } = loadingController('updatePin')

  handleSetPending()

  const {
    data,
    error
  } = await supabase
    .from(LIBRARY_TABLE)
    .update({
      pined,
    })
    .match({
      userID,
      word,
    })

  if (error) {
    handleSetError()

    return null
  }

  handleSetSuccess()

  return data

}