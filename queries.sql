CREATE TABLE notes (
	ISBN VARCHAR(13) PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	note TEXT
);


INSERT INTO notes (ISBN, title, note) VALUES
('9783161484100', 'Don Quixote', 'A classic novel by Miguel de Cervantes.'),
('9780747532743', 'Harry Potter and the Philosopher''s Stone', 'The first book in the Harry Potter series by J.K. Rowling.'),
('9780140449136', 'Crime and Punishment', 'A novel by Fyodor Dostoevsky exploring themes of guilt and redemption.');
