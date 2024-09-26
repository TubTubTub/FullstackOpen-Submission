CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer default 0);
insert into blogs (author, url, title, likes) values ('Jimmy', 'jimmy.com', 'jimmy loves books', 1);
insert into blogs (author, url, title, likes) values ('Dave', 'dave.com', 'Dave loves games', 3);
drop table blogs; drop table users; drop table migrations;