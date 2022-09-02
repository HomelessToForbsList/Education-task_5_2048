

  function press(arr) {
    let indexEl = arr.findIndex(el => el !== 0)
    for (let i = indexEl + 1; i < arr.length; i++) {
      if (arr[indexEl] !== 0) {
        const range = arr.slice(i)
        let indexSame = range.findIndex(el => el === arr[indexEl])
        if (indexSame > -1) {
          const gap = range.slice(0, indexSame)
          if (gap.findIndex(el => el !== 0) < 0 || gap.length === 0) {
            let zero = arr.slice(0,indexEl)
            const position = zero.indexOf(0)
            if(position > -1) {
              arr[position] = arr[indexEl]*2
              arr[indexEl] = 0
            }
            else arr[indexEl] *= 2
            arr[indexSame + i] = 0
          }
        }
      }
      indexEl += 1
    }
    let replaced = false
    while(!replaced){
      const indexZero = arr.findIndex(el => el === 0)
      if(indexZero > -1){
        const first = arr.slice(0,indexZero+1)
        const second = arr.slice(indexZero+1)
        const num = second.findIndex(el => el !==0)
        if(num > -1){
          arr[indexZero] = arr[indexZero+num+1]
          arr[indexZero+num+1] = 0
        }
        else replaced = true
      }
      else replaced = true
    }
    console.log(arr)
  }


  function change(arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
      let item = []
      arr.forEach(el => {
        item.push(el[i])
      })
      result.push(item)
    }
    return result
  }

  function createValue(arr){
    const tempMatrix = Math.random()
    let indexMatrix
    const value = tempMatrix > 0.5 ? 4 : 2
    let created = false
    function add(indexMatrix){
      const tempArr = Math.random()
      let indexArr
      switch(true){
        case tempArr>=0 && tempArr <= 0.25:
          indexArr = 0
          break;
        case tempArr>0.25 && tempArr <= 0.5:
          indexArr = 1
          break;
        case tempArr>0.5 && tempArr<= 0.75:
          indexArr = 2
          break;
        case tempArr>0.75 && tempArr < 1:
          indexArr = 3
          break;
      }
      if(!created && arr[indexMatrix][indexArr] === 0) {
        arr[indexMatrix][indexArr] = value
        created = true
      }
      else createValue(arr)
    }
    switch(true){
      case tempMatrix>=0 && tempMatrix <= 0.25:
        indexMatrix = 0
        break;
      case tempMatrix>0.25 && tempMatrix <= 0.5:
        indexMatrix = 1
        break;
      case tempMatrix>0.5 && tempMatrix <= 0.75:
        indexMatrix = 2
        break;
      case tempMatrix>0.75 && tempMatrix < 1:
        indexMatrix = 3
        break;
    }
    add(indexMatrix)
    return arr
  }

  console.log(createValue([[0,1,0,1],[0,2,0,2],[0,3,0,3],[0,4,0,4]]))


  
  // chekEndGame(newData){
  //   let hasZero = false
  //   let hasNewValue = false
  //   newData.forEach(arr => arr.forEach(value => {
  //     if(value === 0) hasZero = true
  //   }))
  //   newData.forEach((item,index) => {
  //     item.forEach((el,i) => {
  //       if(el !== this.data[index][i]) hasNewValue = true
  //     })
  //   })
  //   if(!hasZero && !hasNewValue) this.endGame = true
  // }