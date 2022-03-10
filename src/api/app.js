const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
<<<<<<< HEAD:src/api/app.js
const auth = require('../middlewares/auth');
=======

const { authToken, validateBody } = require('../middlewares');

const PORT = process.env.PORT || 8080;
>>>>>>> tiago-sathler-api-jwt:api/server.js

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();

<<<<<<< HEAD:src/api/app.js
apiRoutes.get('/api/posts', auth, routes.getPosts);
apiRoutes.post('/api/users', routes.createUsers);
apiRoutes.get('/api/users', routes.getUsers);
apiRoutes.get('/api/users/:userId', auth, routes.getUserById);
apiRoutes.post('/api/login', routes.login);
=======
apiRoutes.post('/api/login', validateBody, routes.login);
apiRoutes.post('/api/users', validateBody, routes.createUsers);
apiRoutes.get('/api/posts', authToken, routes.getPosts);
apiRoutes.get('/api/users', authToken, routes.getUsers);
>>>>>>> tiago-sathler-api-jwt:api/server.js

app.use(apiRoutes);

module.exports = app;
