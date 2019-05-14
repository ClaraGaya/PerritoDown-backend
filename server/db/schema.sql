
DROP TABLE IF EXISTS Users cascade;
DROP TABLE IF EXISTS Asanas cascade;
DROP TABLE IF EXISTS Routines cascade;
DROP TABLE IF EXISTS UserAsanas cascade;

CREATE TABLE Users (
    ID SERIAL PRIMARY KEY,
    UserName VARCHAR(40) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Pwd VARCHAR(50) NOT NULL  
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

