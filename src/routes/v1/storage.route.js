const express = require('express');
const storageController = require('../../controllers/storage.controller');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');

const router = express.Router();

router.post('/upload', auth('uploadFile'), upload, storageController.uploadFile);
router.get('/files', auth('readFiles'), storageController.readFIles);
router.delete('/file/:id', auth('deleteFiles'), storageController.removeFile);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Storage
 *   description: Keeps all uploaded files
 */

/**
 * @swagger
 * /storage/upload:
 *   post:
 *     summary: Upload file to storage
 *     tags: [Storage]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               name:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "201":
 *         description: Uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 */
