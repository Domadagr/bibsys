import { check, validationResult } from "express-validator";
import bookService from '../services/bookService.js';


export const getStatus = (req, res) => {
    res.status(200).send({
        status: "Running",
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        date: new Date()
    });
}

export const getBooklist = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, year, genre, limit, sort, order } = req.query;

    try {
        const booklist = await bookService.getBooklist({ title, author, year, genre, limit, sort, order });
        res.status(200).json(booklist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBook = async (req, res) => {
    const regex = /^[0-9]+$/;
    if (!regex.test(req.params.id)) {
        return res.status(400).json({ error: "Invalid book id" })
    }
    const bookId = parseInt(req.params.id);

    if (!Number.isInteger(bookId) || bookId < 0) {
        return res.status(400).json({ error: "Invalid book id" })
    }

    try {
        const book = await bookService.getBook(parseInt(bookId));
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const addBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newBook = await bookService.addBook(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const patchBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const reqID = parseInt(req.params.id);
        const patchedBook = await bookService.patchBook(reqID, req.body);
        res.status(200).send(patchedBook);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const deleteBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const book = await books.deleteBook(parseInt(req.params.id));
        if (!book) {
            res.status(404).send({ error: "Book not found" });
        }
        res.json(book);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
