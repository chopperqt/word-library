import type { AuthRequests } from "api/auth.api"

export interface Statuses {
  isLoading: boolean
  isError: boolean
  isFetched: boolean
}

export interface StatusesPayload extends Partial<Statuses> {
  name: Requests
}

export type Requests = AuthRequests