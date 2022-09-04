export type AuthType = 'sign-in' | 'sign-up'

export const setAuthParam = (type: AuthType) => {
  const href = window.location.href
  const url = new URL(href)

  url.searchParams.set('type', type)

  window.history.replaceState('', '', '?' + url.searchParams)
}