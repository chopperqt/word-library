import supabase from "./client"

import type {
  CreateWord,
  Word,
} from "models/Library.models"
import type { UserID } from "models/Auth.models"

const LIBRARY_TABLE = 'library'

export const createLibraryWord = async (wordData: CreateWord): Promise<Word[] | null> => {
  const {
    data,
    error,
  } = await supabase
    .from(LIBRARY_TABLE)
    .insert(wordData)

  if (error || !data) {
    return null
  }

  return data
}

export const getLibraryWords = async (userID: UserID): Promise<Word[] | null> => {
  const {
    data,
    error,
  } = await supabase
    .from(LIBRARY_TABLE)
    .select('*')
    .match({ userID })

  if (error || !data) {
    return null
  }

  return data
}