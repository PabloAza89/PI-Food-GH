let qq = [1,2,3,4]


//let rr = qq.map((e,i) => { return e !== 2 ?  e : undefined})//.filter(e => e !== undefined)
let rr = qq.filter(e => e !== 3)

console.log(
  //qq.splice(rr)
  //rr
  qq.filter(e => e !== 5)
  //qq.includes(3)
)