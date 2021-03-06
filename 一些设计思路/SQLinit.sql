grant all privileges on test.* to 'www'@'%' identified by 'www';

create database test;

use test;

create table inbound_notes (
    ID_time 		bigint not null,
    createAt        varchar(20) not null,
    container_id 	varchar(100) not null,
    brand 		varchar(20) not null,
    name 		varchar(20) not null,
    level 		varchar(10) not null,
    quanlity 	int not null,
    volume_sum  float not null,
    goods_mark  varchar(10) not null,
    primary key (ID_time)
) engine=innodb;

create table inbound_items (
    `ID` bigint not null,
    `ID_time` bigint not null,
    createAt varchar(20) not null,
    soldpcs int not null default 0,
    thickness int not null,
    width int not null,
    length float not null,
    pcs int not null,
    volume float not null,
    primary key (ID)
) engine = innodb;

create table delivery_notes (
    id_delivery 	bigint not null,
    createAt    varchar(20) not null,
    editor 	 	varchar(20) not null,
    total_price 	float not null,
    primary key (id_delivery)
) engine=innodb;

create table delivery_items (
    id 		bigint not null,
    createAt    varchar(20) not null,
    unitprice 	float not null,
    amount 	float not null,
    id_delivery 	varchar(50) not null,
    remarks 	varchar(50) not null,
    pcs int not null,
    volume float not null,
    thickness int not null,
    width int not null,
    length float not null,
    primary key (id)
) engine=innodb;