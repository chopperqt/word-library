import type { Option } from "components/input-multi"
import type { UserID } from "./Auth.models"

export interface Word {
  id: number
  userID: UserID
  word: string
  translate: string[]
  pined: boolean
  createdAt: Date | string
}

export interface WordForm {
  word: Word['word']
  translate: Option[]
  pined: Word['pined']
}

export interface CreateWord extends Pick<WordForm, 'pined' | 'word'> {
  userID: UserID
  translate: Word['translate']
}

export type WordID = Word['id']