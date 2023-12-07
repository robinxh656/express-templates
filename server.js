const dotenv = require('dotenv');

const app = require('./app');
const { connectDB } = require('./src/configs/db');

// add config
dotenv.config({ path: './.env' });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `App is running on port ${PORT} and ${process.env.NODE_ENV} mode`,
    connectDB(process.env.DATABASE_LOCAL),
  );
});
