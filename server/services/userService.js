import sql from '../config/db.js';

export const findUser = async (username) => {
    try {
        const [result] = await sql`
        SELECT * FROM users
        WHERE username = ${username}`;

        return result;
    } catch (error) {
        console.error("Find user error: ", error.message);
        throw new Error("Error finding User");
    }
}

export const checkUserId = async (userId) => {
    try {
        const query = await sql`
        SELECT user_type FROM users
        WHERE id = ${userId}`;

        return query;
    } catch (error) {
        console.error("Error in checkUserId: ", error.message);
        throw new Error("Error fetching ID");
    }  
}

export const findUserType = async (username) => {
    try {
        const query = await sql`
        SELECT id FROM users
        WHERE username = ${username}`;
    
        return query;
    } catch (error) {
        console.error("Error in findUserType: ", error.message);
        throw new Error("Error fetchin user type");
    }
}

export default { checkUserId, findUserType, findUser }