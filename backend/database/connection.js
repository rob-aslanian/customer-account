const mongoose = require('mongoose');
const process = require('process');

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://db:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
  })
  .then(() => {
    console.log('successfully connected to the database');
  })
  .catch((err) => {
    console.log('error connecting to the database');
    process.exit();
  });
mongoose.set('useFindAndModify', false);
