create table user (
    user_id tinyint not null auto_increment primary key,
    email varchar(100),
    password varchar(60),
    name varchar(100)
);

create table category (
    category_id tinyint not null auto_increment primary key,
    category_name varchar(100)
);

create table post (
    post_id tinyint not null auto_increment primary key,
    post_name varchar(100),
    post_content text,
    category_id tinyint,
    user_id tinyint,
    foreign key (category_id) references category(category_id),
    foreign key (user_id) references user(user_id)
);