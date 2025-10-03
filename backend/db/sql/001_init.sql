-- create tables

CREATE TABLE IF NOT EXISTS property (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(155) NOT NULL,
    type ENUM("Rent", "Buy", "Exchange", "Donation") NOT NULL,
    area VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    description TEXT,
    list_date DATETIME DEFAULT CURRENT_TIMESTAMP
);