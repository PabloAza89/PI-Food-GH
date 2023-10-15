let qq = [1,2,3,4,5,6,7,8,9,10,11]
let result = []

const chunkSize = 3;
for (let i = 0; i < qq.length; i += chunkSize) {
  result.push(qq.slice(i, i + chunkSize))
}

console.log(
  //qq
  result
)