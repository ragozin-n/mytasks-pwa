CREATE TABLE Users (
id serial,
username char(30) NOT NULL UNIQUE,
password char(30) NOT NULL,
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