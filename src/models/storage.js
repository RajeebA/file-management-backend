module.exports = (sequelize, DataTypes) => {
  const Storage = sequelize.define(
    'storage',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { paranoid: true }
  );
  Storage.associate = function (models) {
    // associations can be defined here
    Storage.belongsTo(models.User, { foreignKey: 'user', as: 'userDetails' });
  };
  return Storage;
};
