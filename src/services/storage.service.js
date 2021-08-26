const AWS = require('aws-sdk');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const { isRestrictedFileType } = require('../validations/custom.validation');
const { storage, User } = require('../models');

AWS.config.update({
  accessKeyId: config.AWS.acces_key_id,
  secretAccessKey: config.AWS.secret_access_key,
  region: 'us-east-2',
});
const bucketName = 'rajeeb-filestorage';
const s3 = new AWS.S3();

/**
 * Upload file to aws s3
 * @param {string} req
 * @returns {Promise<File>}
 */
const fileUpload = async (req) => {
  const isRestrictedFile = isRestrictedFileType(req.file);
  if (isRestrictedFile) throw new ApiError(400, isRestrictedFile);
  const params = {
    Bucket: bucketName,
    Key: `${Date.now()}.${req.file.originalname}`,
    Body: req.file.buffer,
  };
  const data = await s3
    .upload(params)
    .promise()
    .catch((err) => {
      throw new ApiError(400, err);
    });
  return data;
};
/**
 * Create a file
 * @param {Object} fileBody
 * @returns {Promise<file>}
 */
const createFile = async (fileBody) => {
  const file = await storage.create(fileBody);
  return file;
};
/**
 * Query for files
 * @param {Object} filter - Sequelize filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFiles = async (filter, options, associationsRequired) => {
  const includes = associationsRequired ? { model: User, as: 'userDetails' } : null;

  const files = await storage.findAndCountAll({
    where: filter,
    offset: options.page,
    limit: options.limit,
    include: includes,
  });
  return files;
};
/**
 * Upload file to aws s3
 * @param {string} req
 * @returns {Promise<File>}
 */
const removeFile = async (id) => {
  const params = {
    Bucket: bucketName,
    Key: id,
  };
  const data = await s3
    .deleteObject(params)
    .promise()
    .catch((err) => {
      throw new ApiError(400, err);
    });
  await storage.destroy({
    where: {
      file_key: id,
    },
  });
  return data;
};
module.exports = {
  fileUpload,
  createFile,
  queryFiles,
  removeFile,
};
