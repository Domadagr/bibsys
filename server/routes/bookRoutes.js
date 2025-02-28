import express from 'express';
const router = express.Router();
import { getBooklist, getStatus, getBook, addBook, patchBook, deleteBook } from '../controllers/bookController.js';
import { body, param, validationResult, check } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';

router.get('/status', authenticateToken(['admin']), getStatus);
router.get('/booklist', getBooklist);
router.get('/booklist/:id', getBook);
router.post('/addbook', 
    [
        body('title').isString().withMessage('Title must be a string').trim().notEmpty().withMessage('Title is required'),
        body('author').isString().withMessage('Author must be a string').trim().notEmpty().withMessage('Author is required'),
        body('year').isInt({ min: 0 }).withMessage('Year must be a positive integer').notEmpty().withMessage('Year is required'),
        body('genre').optional().isString().withMessage('Genre must be a string'),
    ],
    authenticateToken(['admin', 'editor']), addBook);
router.patch('/patchbook/:id',
    [
        param('id')
            .isInt({ min: 0 }).withMessage('ID must be a positive integer')
            .toInt(),
            body('title')
            .isLength({ max: 255 }).withMessage('Title must not exceed 100 characters'),
            body('author')
            .isLength({ max: 255 }).withMessage('Author must not exceed 100 characters'),
            body('year')
            .isInt({ min: 1400, max: 2060 }).withMessage('Year must be a number'),
            body('genre')
            .isLength({ max: 100 }).withMessage('Genre must not exceed 100 characters'),
    ], 
    authenticateToken(['admin', 'editor']), patchBook);
router.delete('/deletebook/:id',
    [
        param('id')
            .isInt({ min: 0 }).withMessage('ID must be a positive integer')
            .toInt()
    ], 
    authenticateToken(['admin']), deleteBook);

router.get('/time', (req, res) => {
    res.json({ serverTime: new Date().toISOString() });
    });

export default router;

