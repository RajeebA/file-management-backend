const { tokenTypes } = require('../config/tokens');

module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'Token',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
        allowNull: false,
      },
      expires: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      blacklisted: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
    },
    { paranoid: true }
  );
  Token.associate = function (models) {
    // associations can be defined here
    Token.belongsTo(models.User, { foreignKey: 'user', as: 'userDetails' });
  };
  return Token;
};
