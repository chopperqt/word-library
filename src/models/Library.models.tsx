export interface Word {
  word: string
  translate: string[]
  pined: boolean
  id: number
  createdAt: Date | string
  userID: string
}

export interface WordForm {
  word: Word['word']
  translate: Word['translate']
  pined: Word['pined']
}

export type WordID = Word['id']