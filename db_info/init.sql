CREATE TABLE Users (
id serial NOT NULL DEFAULT '0',
username char(30) NOT NULL UNIQUE DEFAULT '0',
password chkpass NOT NULL,
CONSTRAINT Users_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Posts (
username char(30) NOT NULL,
post char(140) NOT NULL,
isDone bool NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE Posts ADD CONSTRAINT Posts_fk0 FOREIGN KEY (username) REFERENCES Users(username);

