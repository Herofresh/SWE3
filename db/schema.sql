DROP DATABASE IF EXISTS vet_db;
CREATE DATABASE vet_db;
USE vet_db;

CREATE TABLE cats
(
	id INT NOT NULL AUTO_INCREMENT,
	pet_name VARCHAR(30) NOT NULL,
	pet_age INTEGER(2),
	pet_sex VARCHAR(6) NOT NULL,
	desexed BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);