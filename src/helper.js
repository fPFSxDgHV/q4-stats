export const delay = ms => new Promise(resolve => {
  setInterval(resolve, ms)
})