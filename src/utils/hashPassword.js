const bcrypt = require('bcryptjs');
/**
 * Hash user's password
 * @param {string} password
 * @returns {Promise<string>}
 */
const hashPassword = async function (password) {
  const salt = await bcrypt.hash(password, 8);
  return salt;
};
module.exports = hashPassword;
