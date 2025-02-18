const forceDatabaseRefresh = false;

import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import { UserFactory } from './models/user.js';

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

UserFactory(sequelize);

// Serves static files in the entire client's dist folder
const clientBuildPath = path.join(__dirname, "../../client/dist");
app.use(express.static(clientBuildPath));

app.use(express.json());
app.use(routes);

app.get("*", (_req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});


sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
