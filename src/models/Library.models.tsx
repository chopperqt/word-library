export interface Word {
  word: string
  translate: string[]
  pined: boolean
  id: number
  createdAt: Date | string
  userID: string
}

export type Words = Word[]
export type WordID = Word['id']