module.exports = (sequelize, Sequelize) => {
  const entities = {};
  
    entities.authentication = sequelize.define('authentication', {
    
    username: {
      type: Sequelize.STRING
    },
    
    password: {
      type: Sequelize.STRING
    }
    
    });
    
  return entities;
};
