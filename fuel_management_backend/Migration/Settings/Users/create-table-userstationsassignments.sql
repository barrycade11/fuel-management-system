CREATE TABLE userstationassignments (
	ID serial primary key
,	userid int references users(id) 
		ON DELETE CASCADE
,	stationid INT references station(id)
		ON UPDATE CASCADE
,	createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
,	createdby varchar(80) references users(username)
,	updatedat TIMESTAMP NULL
,	updatedby varchar(80) NULL references users(username)
)
