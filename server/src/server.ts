const forceDatabaseRefresh = false;

import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import { UserFactory } from './models/user.js'; 

const app = express();
const PORT = process.env.PORT || 3001;

UserFactory(sequelize);

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
