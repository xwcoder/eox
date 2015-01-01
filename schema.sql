drop database if exists blog;

create database blog;

use blog;

grant select, insert, update, delete on blog.* to 'creep'@'localhost' identified by '123456';

create table users (
    `id` int not null auto_increment,
    `email` varchar(50) not null,
    `password` varchar(50) not null,
    `admin` bool not null,
    `name` varchar(50) not null,
    `image` varchar(500),
    `created_at` real not null,
    unique key `idx_email` (`email`),
    key `idx_created_at` (`created_at`),
    primary key (`id`)
) engine=innodb default charset=utf8;

create table posts (
    `id` int not null auto_increment,
    `user_id` int not null,
    `user_name` varchar(50) not null,
    `user_image` varchar(500),
    `name` varchar(50) not null,
    `summary` varchar(200) not null,
    `content` mediumtext not null,
    `created_at` real not null,
    key `idx_created_at` (`created_at`),
    primary key (`id`)
) engine=innodb default charset=utf8;

create table comments (
    `id` int not null auto_increment,
    `blog_id` int not null,
    `user_id` int not null,
    `user_name` varchar(50) not null,
    `user_image` varchar(500),
    `content` mediumtext not null,
    `created_at` real not null,
    key `idx_created_at` (`created_at`),
    primary key (`id`)
) engine=innodb default charset=utf8;
