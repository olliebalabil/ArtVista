DROP TABLE IF EXISTS art CASCADE;
DROP TABLE IF EXISTS token CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS artTags CASCADE;
DROP TABLE IF EXISTS userLikes CASCADE;

CREATE TABLE tags (
    tag_id INT GENERATED ALWAYS AS IDENTITY,
    tag VARCHAR (100) NOT NULL,
    PRIMARY KEY (tag_id)
);

CREATE TABLE Users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) UNIQUE NOT NULL ,
    password VARCHAR(255) NOT NULL,
    profile_url VARCHAR(1000) NOT NULL,
    bio VARCHAR(500),
    contact_url VARCHAR(1000),
    PRIMARY KEY(user_id)
);

CREATE TABLE art (
    art_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(10000),
    likes INT NOT NULL,
    url VARCHAR(1000) NOT NULL,
    PRIMARY KEY(art_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE artTags (
    art_id INT,
    tag_id INT,
    PRIMARY KEY (art_id, tag_id),
    FOREIGN KEY (art_id) REFERENCES art(art_id),
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
);

CREATE TABLE userLikes (
    user_id INT,
    art_id INT,
    PRIMARY KEY (art_id, user_id),
    FOREIGN KEY (art_id) REFERENCES art(art_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE comments (
    comment_id INT GENERATED ALWAYS AS IDENTITY,
    art_id INT NOT NULL,
    user_id INT NOT NULL,
    content VARCHAR(4000),
    PRIMARY KEY(comment_id),
    FOREIGN KEY (art_id) REFERENCES art(art_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

INSERT INTO tags (tag)
VALUES 
    ('Painting'),
    ('Drawing'),
    ('Digital'),
    ('Photography'),
    ('Animals'),
    ('Landscapes'),
    ('Portraits'),
    ('Abstract'),
    ('Historic Artists'),
    ('Active Artists'),
    ('Still Life'),
    ('Sculpture');
