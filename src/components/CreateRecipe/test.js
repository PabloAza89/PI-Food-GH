let target = "#access_token=ya29.a0AfB_byDIz7hhoF8LD-CKwEThmne7OFCMeVSE0Fe9S63pZMYyMyETZn-DZJAMtRHeJ81F5xlzKWsXhO7nwRJyPH1HU16WUicndnUofWtLtm9OJxLlFViidifL5j9sdfDUcUIzBiEvQ1af3myuTkbPsUGOBocrt2H-lL7vIQaCgYKAegSARESFQHsvYlsmHQGVEJKfKUuGb2CdOmrWw0173&token_type=Bearer&expires_in=3599&scope=email%20profile%20https://www.googleapis.com/auth/userinfo.email%20openid%20https://www.googleapis.com/auth/userinfo.profile&authuser=2&prompt=consent"

let start = target.indexOf(`#access_token=`)
let end = target.indexOf(`&token_type=`)

let auth = target.slice(start+14,end)

console.log(start)
console.log(end)
console.log(auth)
