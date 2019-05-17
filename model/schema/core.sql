DROP TABLE IF EXISTS Users cascade;
DROP TABLE IF EXISTS Asanas cascade;
DROP TABLE IF EXISTS Routines cascade;
DROP TABLE IF EXISTS UserAsanas cascade;

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE  
);

CREATE TABLE Asanas (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(100),
    Sanskrit VARCHAR(100),
    English VARCHAR(100),
    Type VARCHAR(50),
    ImgURL VARCHAR
);

CREATE TABLE Routines (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(30),
    Description VARCHAR(100),
    UserID integer
);

CREATE TABLE UserAsanas (
    ID SERIAL PRIMARY KEY,
    UserID integer,
    AsanaID integer,
    RoutineID integer
);
