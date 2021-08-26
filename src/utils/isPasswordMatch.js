const bcrypt = require('bcryptjs');
/**
 * Check if password matches the user's password
 * @param {string} password
 * @param {Object} user
 * @returns {Promise<boolean>}
 */
const isPasswordMatch = async function (password, user) {
  return bcrypt.compare(password, user.password);
};
module.exports = isPasswordMatch;
