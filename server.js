const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

//listen to uncaught exceptions
process.on('uncaughtException', error => {
  console.log(`Error: ${error.name}, shutting down server...`);
  process.exit(1)
})

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Database connection established...');
  })
  .catch(err => {
    console.log(err);
  })

const port = process.env.PORT || 8000
const server = app.listen(port, 'localhost', () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode`);
  console.log(`Server is running on port ${port}`);
});

//listen to unhandled rejections
process.on('unhandledRejection', error => {
  console.log(`${error.name}, shutting down server...`);
  server.close(() => {
    process.exit(1)
  })
})