const { roles } = require('../config/roles');
const hashPassword = require('../utils/hashPassword');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: roles,
        defaultValue: 'user',
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      paranoid: true,
    }
  );
  User.associate = function () {
    // associations can be defined here
  };
  User.beforeCreate(async (user) => {
    const hashedPassword = await hashPassword(user.password);
    // eslint-disable-next-line no-param-reassign
    user.password = hashedPassword;
  });
  return User;
};
