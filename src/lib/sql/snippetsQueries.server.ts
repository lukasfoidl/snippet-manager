export const snippetQuery = `
    SELECT
        s.id AS id,
        s.title AS title,
        s.description AS description,
        s.content AS content,
        c.id AS category_id,
        c.name AS category_name,
        c.color AS category_color
    FROM
        snippets s
    LEFT JOIN
        snippets_categories sc ON s.id = sc.snippet_id
    LEFT JOIN
        categories c ON sc.category_id = c.id
    WHERE
        s.user_id = ?
    AND
        s.id = ?;
    `;

export const snippetsQuery = `
    SELECT
        s.id AS id,
        s.title AS title,
        s.description AS description,
        s.content AS content,
        c.id AS category_id,
        c.name AS category_name,
        c.color AS category_color
    FROM
        snippets s
    LEFT JOIN
        snippets_categories sc ON s.id = sc.snippet_id
    LEFT JOIN
        categories c ON sc.category_id = c.id
    WHERE
        s.user_id = ?
    ORDER BY
        s.created_at DESC;
    `;

export const updateSnippetStatement = `
    UPDATE 
        snippets
    SET
        title = ?,
        description = ?,
        content = ?
    WHERE
        user_id = ?
    AND
        id = ?;
`;

export const deleteSnippetsCategoriesStatement = `
    DELETE FROM 
        snippets_categories
    WHERE
        snippet_id = ?;
`;

export const deleteSnippetStatement = `
    DELETE FROM 
        snippets
    WHERE
        user_id = ?
    AND
        id = ?;
`;

export const insertSnippetsCategoriesStatement = `
    INSERT INTO
        snippets_categories (snippet_id, category_id)
    VALUES (?, ?);
`;

export const insertSnippetStatement = `
    INSERT INTO
        snippets (user_id, title, description, content)
    VALUES (?, ?, ?, ?)
`;
