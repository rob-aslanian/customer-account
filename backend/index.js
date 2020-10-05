const express = require('express');
const bodyParser = require('body-parser');
const fileUload = require('express-fileupload');
const cors = require('cors');
const dbConnect = require('./database/connection');
const router = require('./routers/index.router'),
  app = express();

app.use('/files', express.static('uploads'));
app.use(bodyParser.json());
app.use(fileUload());
app.use(cors());

router(app);

app.listen(8800, () => {
  console.log('Server is running');
});
