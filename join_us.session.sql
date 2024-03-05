SELECT
    constraint_name,
    table_name,
FROM
    information_schema.table_constraints
WHERE
    table_schema = 'railway' AND
    table_name = 'users' AND
    constraint_type = 'CHECK';