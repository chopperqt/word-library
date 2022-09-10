import supabase from "./client"

import type {
  CreateWord,
  Word,
} from "models/Library.models"
import type { UserID } from "models/Auth.models"
import { store } from "services/stores"
import { setWords } from "services/library/Library.store"
import { loadingController } from "helpers/loadingController"

const LIBRARY_TABLE = 'library'

export type LibraryRequests =
  'createLibraryWord' |
  'getLibraryWords' |
  'updateLibraryWord'

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

export const updateLibraryWord = async (wordData: CreateWord, oldWord: string): Promise<Word[] | null> => {
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
      word: oldWord
    })


  if (error || !data) {
    handleSetError()

    return null
  }

  handleSetSuccess()

  return data
}

export const getLibraryWords = async (userID: UserID): Promise<Word[] | null> => {
  const {
    handleSetError,
    handleSetPending,
    handleSetSuccess,
  } = loadingController('getLibraryWords')

  handleSetPending()

  const {
    data,
    error,
  } = await supabase
    .from(LIBRARY_TABLE)
    .select('*')
    .match({ userID })

  if (error || !data) {
    handleSetError()

    return null
  }

  store.dispatch(setWords(data))

  handleSetSuccess()

  return data
}

export const updatePin = async () => {

}