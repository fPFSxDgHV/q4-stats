import {map, compose, toPairs, zipObj} from "ramda";

export const delay = ms => new Promise(resolve => {
  setInterval(resolve, ms)
})

export const reverseObject = object => {
  const result = {}
  for (const [key, value] of Object.entries(object)) {
    result[value] = key
  }
  return result
}

export const convert = compose(map(zipObj(['name', 'count'])), toPairs);