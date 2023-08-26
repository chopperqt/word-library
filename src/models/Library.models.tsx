import { array, boolean, date, number, object, Output, string } from "valibot";
import type { UserID } from "./Auth.models";

const WordSchema = object({
  id: number(),
  userID: string(),
  word: string(),
  translate: array(string()),
  pined: boolean(),
  createdAt: date(),
});

export type Word = Output<typeof WordSchema>;
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
