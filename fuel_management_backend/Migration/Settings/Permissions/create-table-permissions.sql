CREATE TABLE rolepermissions (
    id SERIAL PRIMARY KEY,
    roleid INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    moduleid INT NOT NULL REFERENCES modules(id),
    "create" BOOLEAN DEFAULT FALSE,
    "read" BOOLEAN DEFAULT FALSE,
    "update" BOOLEAN DEFAULT FALSE,
    "delete" BOOLEAN DEFAULT FALSE
);
