export const insertUserStatement = `
    INSERT INTO
        users (username, password)
    VALUES (?, ?);
`;

export const baseUserQuery = `
    SELECT
        id
    FROM
        users
    WHERE
        username LIKE ?;
`;

export const secureUserQuery = `
    SELECT
        id,
        password
    FROM
        users
    WHERE
        username LIKE ?;
`;
