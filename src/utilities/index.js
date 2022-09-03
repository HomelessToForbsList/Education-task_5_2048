function compareArrays(prev, next) {
  let result = []
  if (prev.length < 1) {
    next.forEach(el => {
      el.forEach(item => result.push({ id: Math.random(), value: item }))
    })
  }
  else {
    let index = 0
    next.forEach(arr => {
      arr.forEach(el => {
        if (el !== prev[index].value) {
          result.push({ id: Math.random(), value: el })
          index++
        }
        else {
          result.push(prev[index])
          index++
        }
      })
    })
  }
  return result
}

function getIndex(arr) {
  const index = arr[0] * 4 + arr[1]
  return index
}

export {compareArrays, getIndex}