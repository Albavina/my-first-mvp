--
-- Drop Tables
--

-- SET foreign_key_checks = 0;
-- DROP TABLE if exists students;
-- SET foreign_key_checks = 1;

DROP TABLE if exists animals;
DROP TABLE if exists collaborators;

--
-- Create Tables
--

-- CREATE TABLE students(
--     id INT NOT NULL AUTO_INCREMENT, 
--     firstname VARCHAR(40) not null, 
--     lastname VARCHAR(40) not null, 
--     PRIMARY KEY (id)
--     );

CREATE TABLE `animals`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `animalType` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `age` INT NOT NULL,
    `size` VARCHAR(255) NULL,
    `admissionDate` DATE NOT NULL,
    `adoptionDate` DATE NULL,
    `description` VARCHAR(255) NOT NULL,
    `picture` VARCHAR(255) NOT NULL,
    `collaboratorId` INT NULL
);

CREATE TABLE `collaborators`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phoneNumber` INT NOT NULL,
    `age` BIGINT NOT NULL,
    `kindOfCollaboration` VARCHAR(255) NOT NULL 
);


