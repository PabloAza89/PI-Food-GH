//let qq = RegExp(`^/` + "[.]" + "[^R]$", `g`).test("/xasdsaR")
//let qq = RegExp(`^/` + `.*` + `/$`).test("/ssdd/")
//let qq = RegExp(`^/` + `[^/]*` + `/$`).test("/ss")


// let qq = RegExp(`^/` + `[^/]*` + `([^/]$|/$)`).test("//") // MAKE IT MATCH WITH TWO //

//let qq = RegExp(`^/` + `[^/]*` + `([^/]$|/$)`).test("//")
//let qq = RegExp(`^/` + `[^/]*` + `([^/]$|/${1})`).test("/asdasdad/") // THIS MATCH GRONG IN 

//let qq = RegExp(`^/{1}` + `[^/]*` + `([^/]$|[/]$)`).test("//") // THIS MATCH WRONG IN 
//let qq = RegExp(`^/` + `[^/]*` + `([^/]$|[/]$)`).test("/sa/") // THIS MATCH WRONG IN 
//let qq = RegExp(`^/` + `[^/]$`).test("/-") // THIS MATCH WRONG IN 

//let qq = RegExp(`^/` + `[^/]*` + `([^/]$|[/]$)`).test("/?asdd") // THIS MATCH WRONG IN 

let qq = ["navbarr"]

//console.log(qq.toLowerCase().match(RegExp("^/navbar$", "g")))
console.log(qq.filter(e => e !== "navbar")[0])


// {3}