const db = require("../Models");
const Authentication = db.authentication;
const Op = db.Sequelize.Op;
const util = require("../Utils/utils.js").auth;


exports.login = (req, res) => {
  const { username, password } = req.body;

  Authentication.findOne({ where: { username: username } })
    .then(async user => {
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

      const passwordIsValid = await util.comparePasswords(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid password.' });
      }

      const token = util.generateToken({ id: user.id, username: user.username });

      res.status(200).send({
        id: user.id,
        username: user.username,
        token: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


// Create and Save a new Authentication
exports.create = async (req, res) => {
  
  // Create a Authentication
  const authentication = {
    
      username:(req.body.username),
    
      password: await util.hashPassword(req.body.password)
    
  };

  // Save Authentication in the database
  Authentication.create(authentication)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Authentication."
      });
    });
};


// Find a single Authentication with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Authentication.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Authentication with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Authentication with id=" + id
      });
    });
};

// Update a Authentication by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Authentication.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Authentication was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Authentication with id=${id}. Maybe Authentication was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Authentication with id=" + id
      });
    });
};

// Delete a Authentication with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Authentication.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Authentication was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Authentication with id=${id}. Maybe Authentication was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Authentication with id=" + id
      });
    });
};

// Delete all Authentication from the database.
exports.deleteAll = (req, res) => {
  Authentication.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Authentication were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Authentication."
      });
    });
};

// find all  Authentication
exports.findAllPublished = (req, res) => {
  Authentication.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Authentication."
      });
    });
};

// Perform a partial string search
exports.filter = async (req, res) => {
  try {

    const criteria = {
      [Op.or]: [],
    };

    const filterText = req.query.filtertext;
    const columns = [
    
      "username",
    
      "password",
    
    ];

    for (const column of columns) {
      const condition = {};
      condition[column] = { [Op.regexp]: `(${filterText})` };
      criteria[Op.or].push(condition);
    }

    const filteredData = await Product.findAll({
      where: criteria,
    });

    res.send(filteredData);
  } catch (err) {
    res.status(500).send({
      message: "Error filtering Product.",
      error: err.message,
    });
  }
};

