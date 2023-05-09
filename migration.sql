CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  price INT(11),
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