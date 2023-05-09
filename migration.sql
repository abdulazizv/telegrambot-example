CREATE TABLE orders(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    order_date DATE,
    price INT,
    PRIMARY KEY(id)
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255), 
    username VARCHAR(255),
    PRIMARY KEY(id) 
);

CREATE TABLE sessions (
  id varchar(100) NOT NULL,
  session longtext NOT NULL,
  PRIMARY KEY (id)
);