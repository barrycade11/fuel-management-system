CREATE TABLE modules (
	id serial primary key
,	name varchar(120) unique
,	parentmoduleid INT NULL REFERENCES modules(id)
,	createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_parentmodule FOREIGN KEY (parentmoduleid) REFERENCES modules(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
)
