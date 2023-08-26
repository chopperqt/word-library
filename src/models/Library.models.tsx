import { array, boolean, number, object, Output, string } from "valibot";
import type { UserID } from "./Auth.models";

export const WordSchema = object({
  id: number(),
  userID: string(),
  word: string(),
  translate: array(string()),
  pined: boolean(),
  createdAt: string(),
});

export type WordApi = Output<typeof WordSchema>;
export type WordID = WordApi["id"];

export interface WordForm {
  word: WordApi["word"];
  translate: string[];
  pined: WordApi["pined"];
}

export interface CreateWord extends Pick<WordForm, "pined" | "word"> {
  userID: UserID;
  translate: WordApi["translate"];
}

export interface UpdateWord extends CreateWord {
  wordID: WordID;
}
