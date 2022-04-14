const mongoose = require('mongoose')

const dbConfig = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('Database is connected'))
    .catch((err) => console.error(err))
}

module.exports = dbConfig
