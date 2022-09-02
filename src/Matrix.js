class Matrix {
  constructor() {
    this.array = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    this.countValue = 0
    this.isGameOver = false
    this.scores = [1,5,10]
  }

  get data() {
    return this.array
  }

  set data(data) {
    this.array = data
  }

  get count() {
    return this.countValue
  }

  set count(value) {
    this.countValue += value
  }

  get endGame(){
    return this.isGameOver
  }

  set endGame(value){
    this.isGameOver = value
  }

  get bestScore(){
    return this.scores
  }

  set bestScore(value){
    this.scores = [...this.scores,value]
  }

  updateData(){
    this.endGame = false
    this.data = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  }

  changeArray() {
    let result = []
    for (let i = 0; i < this.data.length; i++) {
      let item = []
      this.data.forEach(el => {
        item.push(el[i])
      })
      result.push(item)
    }
    this.data = result
  }
  sumValues(needReverse) {
    const newData = this.data.map(arr => {
      if (needReverse) arr = arr.reverse()
      let indexEl = arr.findIndex(el => el !== 0)
      for (let i = indexEl + 1; i < arr.length; i++) {
        if (arr[indexEl] !== 0) {
          const range = arr.slice(i)
          let indexSame = range.findIndex(el => el === arr[indexEl])
          if (indexSame > -1) {
            const gap = range.slice(0, indexSame)
            if (gap.findIndex(el => el !== 0) < 0 || gap.length === 0) {
              this.count = arr[indexEl]
              arr[indexEl] *= 2
              arr[indexSame + i] = 0
            }
          }
        }
        indexEl += 1
      }
      if (needReverse) arr = arr.reverse()
      return arr
    })
    this.data = newData
  }
  moveZero(needReverse) {
    const movedArray = this.data.map(arr => {
      if (needReverse) arr = arr.reverse()
      let replaced = false
      while (!replaced) {
        const indexZero = arr.findIndex(el => el === 0)
        if (indexZero > -1) {
          const second = arr.slice(indexZero + 1)
          const num = second.findIndex(el => el !== 0)
          if (num > -1) {
            arr[indexZero] = arr[indexZero + num + 1]
            arr[indexZero + num + 1] = 0
          }
          else replaced = true
        }
        else replaced = true
      }
      if (needReverse) arr = arr.reverse()
      return arr
    })
    this.data = movedArray
  }
  createValue() {
    const arr = this.data
    let canAddValue = false
    arr.forEach(arr => arr.forEach(value => {
      if(value === 0) canAddValue = true
    }))
    if(canAddValue){
      const repeat = this.createValue.bind(this)
    let result
    const tempMatrix = Math.random()
    let indexMatrix
    const value = tempMatrix > 0.5 ? 4 : 2
    let created = false
    function add(indexMatrix) {
      const tempArr = Math.random()
      let indexArr
      switch (true) {
        case tempArr >= 0 && tempArr <= 0.25:
          indexArr = 0
          break;
        case tempArr > 0.25 && tempArr <= 0.5:
          indexArr = 1
          break;
        case tempArr > 0.5 && tempArr <= 0.75:
          indexArr = 2
          break;
        case tempArr > 0.75 && tempArr < 1:
          indexArr = 3
          break;
        default:
          break;
      }
      if (!created && arr[indexMatrix][indexArr] === 0) {
        arr[indexMatrix][indexArr] = value
        result = arr
        created = true
      }
      else {
        repeat()
      }
    }
    switch (true) {
      case tempMatrix >= 0 && tempMatrix <= 0.25:
        indexMatrix = 0
        break;
      case tempMatrix > 0.25 && tempMatrix <= 0.5:
        indexMatrix = 1
        break;
      case tempMatrix > 0.5 && tempMatrix <= 0.75:
        indexMatrix = 2
        break;
      case tempMatrix > 0.75 && tempMatrix < 1:
        indexMatrix = 3
        break;
      default:
        break;
    }
    add(indexMatrix)
    if (result !== undefined) {
      this.data = result.concat()
      this.chekEndGame(result)
    }
    }
  }
  chekEndGame(newData){
    let arrResults =[]
    newData.forEach((item,index)=>{
      item.forEach((el,i) =>{
        let result = []
        let up = index === 0 ? null : newData[index-1][i]
        let down = index === newData.length-1 ? null : newData[index+1][i]
        let right = i === item.length-1 ? null : item[i+1]
        let left = i === 0 ? null : item[i-1]
        if(up !== el && up !== 0) result.push(false)
        else result.push(true)
        if( down !== el && down !== 0) result.push(false)
        else result.push(true)
        if(right !== el && right !== 0) result.push(false)
        else result.push(true)
        if(left !== el && left !== 0) result.push(false)
        else result.push(true)
        arrResults = arrResults.concat(result)
      })
    })
    if(arrResults.indexOf(true) < 0) {
      this.endGame = true
      this.bestScore = this.count
      this.count = -this.count
    }
  }
}

export default Matrix