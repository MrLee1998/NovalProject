export const setLocal = (name, value) => {
  localStorage.setItem(name, value)
}

export const getLocal = (name) => {
  return localStorage.getItem(name)
}

export const deleteLocal = (name) => {
  return localStorage.removeItem(name)
}