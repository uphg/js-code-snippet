// 使用循环解决函数递归对象时的爆栈问题
let count = 0

// code
function clone(value) {
  if (value === null || typeof value !== 'object') return value
  const dist = new Object()
  const temp = [
    [dist, value]
  ]
  while (temp.length) {
    count += 1
    const valueMap = temp.shift()
    const source = valueMap[1]
    const copy = valueMap[0]
    const keys = Object.keys(source)

    keys.forEach((key) => {
      const item = source[key]
      if (item !== null && typeof item === 'object') {
        copy[key] = new Object()
        temp.push([copy[key], item])
      } else {
        copy[key] = source[key]
      }
    })
  }

  return dist
}

// test
const obj = {
  child: {}
}

for (let i = 0; i < 10000; i++) {
  obj[`key${i}`] = i
}

let temp = obj.child
for (let i = 0; i < 10000; i++) {
  temp.child = {}
  temp = temp.child
}

const obj2 = clone(obj)

console.log('obj2')
console.log(obj2)
console.log(`count：${count}`)