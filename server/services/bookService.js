import sql from '../config/db.js';

async function getBooklist({ title, author, year, genre, limit = 10, order = 'title', sort = 'ASC' }) {
  try {
      if (limit <= 0) {
          throw new Error('Limit must be greater than 0');
      }

      const allowedOrders = ['title', 'author', 'year', 'genre'];
      const allowedSorts = ['ASC', 'DESC'];

      if (!allowedOrders.includes(order)) {
          throw new Error('Invalid order parameter');
      }

      const sortDirection = sort.toUpperCase();
      if (!allowedSorts.includes(sortDirection)) {
          throw new Error('Invalid sort parameter');
      }

      let query = sql`SELECT * FROM books WHERE 1=1`;

      if (title) {
          query = sql`${query} AND title ILIKE ${`%${title}%`}`;
      }

      if (author) {
          query = sql`${query} AND author ILIKE ${`%${author}%`}`;
      }

      if (year) {
          query = sql`${query} AND year = ${year}`;
      }

      if (genre) {
          query = sql`${query} AND genre ILIKE ${`%${genre}%`}`;
      }

      // Construct the ORDER BY clause
      const orderByClause = `ORDER BY ${order} ${sortDirection} LIMIT ${limit}`;
      query = sql`${query} ${sql.unsafe(orderByClause)}`;

      const booklist = await query;

      return booklist;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw new Error("Failed to get list, try again later");
    }
};

const addBook = async (book) => {
    try {
        const result = await sql`
        INSERT INTO books (title, author, year, genre)
        VALUES (${book.title}, ${book.author}, ${book.year}, ${book.genre})
        RETURNING *`;
        return result;
    } catch (error) {
        throw new Error("Failed to add book, try again later");
    }
};

const patchBook = async (reqID, patch) => {
    try {
        const [updateBook] = await sql`
        UPDATE books
        SET title = ${patch.title}, author = ${patch.author}, year = ${patch.year}, genre = ${patch.genre}
        WHERE id = ${reqID}
        RETURNING *`;
        return updateBook;
    } catch (error) {
        throw new Error("Failed to update book, try again later");
    } 
};

const getBook = async (id) => {
    try {
        const [book] = await sql`
        SELECT * FROM books
        WHERE id = ${id}`;

    return book;
    } catch (error) {
        throw new Error("Failed to retrieve book, try again later");
    } 
};

const deleteBook = async (id) => {
    try {
        const [book] = await sql`
        DELETE FROM books
        WHERE id = ${id}
        RETURNING *`;
    
        return book;
    } catch (error) {
        throw new Error("Failed to delete book, try again later");
    } 
};


export default { getBooklist, addBook, patchBook, getBook, deleteBook };