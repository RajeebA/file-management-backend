const allRoles = {
  user: ['uploadFile', 'readFiles', 'deleteFiles'],
  admin: ['getUsers', 'manageUsers', 'readFiles', 'deleteFiles'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
