import type { UserID } from "./Auth.models";

export interface Word {
  id: number;
  userID: UserID;
  word: string;
  translate: string[];
  pined: boolean;
  createdAt: Date | string;
}

export type WordID = Word["id"];

export interface WordForm {
  word: Word["word"];
  translate: string[];
  pined: Word["pined"];
}

export interface CreateWord extends Pick<WordForm, "pined" | "word"> {
  userID: UserID;
  translate: Word["translate"];
}

export interface UpdateWord extends CreateWord {
  wordID: WordID;
}
