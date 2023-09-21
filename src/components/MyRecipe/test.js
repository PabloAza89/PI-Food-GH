let qq = [
  "main course"
]

console.log(
qq.map((e:any, idx: any) => {
  return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
})
)