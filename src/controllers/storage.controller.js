const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { storageService } = require('../services');
const pick = require('../utils/pick');

const uploadFile = catchAsync(async (req, res) => {
  const file = await storageService.fileUpload(req, res);
  const body = { location: file.Location, filename: file.key, file_key: file.key, user: req.user.id };
  const result = await storageService.createFile(body);

  res.status(httpStatus.CREATED).send({ result });
});
const readFIles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['filename']);
  if (req.user.role === 'user') filter.user = req.user.id;

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await storageService.queryFiles(filter, options, req.user.role === 'admin');
  res.send(result);
});
const removeFile = catchAsync(async (req, res) => {
  await storageService.removeFile(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});
module.exports = {
  uploadFile,
  readFIles,
  removeFile,
};
