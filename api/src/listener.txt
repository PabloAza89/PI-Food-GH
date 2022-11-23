const app = require('./app.js');
const { conn } = require('./db.js')
const PORT = 3001;

app.listen(PORT, () => {
  // console.log(`Server listening on port ${PORT}`);
  conn.sync({ force: true })
  .then(() => console.log("DB CONNECTED SUCESSFULLY"));
});