import { PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit";

import type { Word } from "models/Library.models";
import type { Search } from "models/Search.model";
import type { RootState } from "services/stores";

const initialState:Search = {
	searchWords: []
}

const SearchStore = createSlice({
	name: 'SearchStore',
	initialState,
	reducers: {
		clearSearch: (state) => {
			state.searchWords = []
		},
		setSearchWords: (state, payload:PayloadAction<Word[]>) => {
			state.searchWords = payload.payload
		}
	}
})

export const { 
	clearSearch,
	setSearchWords,
} = SearchStore.actions

export const getSearchWords = createSelector(
	(state: RootState) => state.SearchStore,
	(items) => items.searchWords
)

export default SearchStore.reducer