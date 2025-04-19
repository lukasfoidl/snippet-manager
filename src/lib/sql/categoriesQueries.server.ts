export const categoryQuery = `
    SELECT
        c.id as id,
        c.name as name,
        c.color as color
    FROM
        categories c
    WHERE
        c.user_id = ?
    AND
        c.id = ?;
    `;

export const updateCategoryStatement = `
    UPDATE 
        categories
    SET
        name = ?,
        color = ?
    WHERE
        user_id = ?
    AND
        id = ?;
`;

export const deleteSnippetsCategoriesStatement = `
    DELETE FROM 
        snippets_categories
    WHERE
        category_id = ?;
`;

export const deleteCategoryStatement = `
    DELETE FROM 
        categories
    WHERE
        user_id = ?
    AND
        id = ?
`;

export const categoriesLeanQuery = `
    SELECT
        c.id AS id
    FROM
        categories c
    WHERE
        c.user_id = ?;
    `;

export const categoriesBaseQuery = `
    SELECT
        c.id AS id,
        c.name AS name,
        c.color AS color
    FROM
        categories c
    WHERE
        c.user_id = ?
    ORDER BY
        c.created_at DESC;
    `;

export const categoriesExtendedQuery = `
    SELECT 
        c.id AS id,
        c.name AS name,
        c.color AS color,
        COUNT(sc.snippet_id) AS count
    FROM 
        categories c
    LEFT JOIN 
        snippets_categories sc ON c.id = sc.category_id
    WHERE 
        c.user_id = ?
    GROUP BY 
        c.id, c.name
    ORDER BY 
        c.created_at DESC;
    `;

export const insertCategoryStatement = `
    INSERT INTO
        categories (user_id, name, color)
    VALUES (?, ?, ?)
`;
