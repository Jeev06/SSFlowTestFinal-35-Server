
module.exports = app => {

const authentication = require('../Controllers/authenticationController.js');
var router = require("express").Router();
const verifyToken = require('../Middlewares/middlewares.js'); 


// Create a new Authentication
router.post('/', authentication.create);


// Login route
router.post('/login', authentication.login);


router.use(verifyToken); // Protected routes - Require authentication

// Retrieve all published Authentication
router.get('/published', authentication.findAllPublished);

//Filter Authentication entries based on partial string matches
router.get('/filter', authentication.filter);

// Retrieve a single Authentication with id
router.get('/:id', authentication.findOne);

// Update a Authentication with id
router.put('/:id', authentication.update);

// Delete a Authentication with id
router.delete('/:id', authentication.delete);

// Delete all Authentication
router.delete('/', authentication.deleteAll);

app.use('/api/authentication', router);

};
