create table user(
    id varchar(255) primary key,
    username varchar(255) Unique ,NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
);