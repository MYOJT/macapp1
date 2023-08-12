
--create squence
CREATE SEQUENCE todos_seq START 1;

-- create tables
create table if not exists public.users(
  user_id int primary key,
  name varchar(255) unique not null,
  password varchar(255) not null,
  create_time timestamp not null default current_timestamp,
  update_time timestamp,
  delete_time timestamp
);
create table if not exists public.todos(
  todo_id int primary key DEFAULT nextval('todos_seq'),
  user_id int,
  todo varchar(255) not null,
  is_finish boolean not null,
  start_time timestamp,
  deadline_time timestamp,
  create_time timestamp not null default current_timestamp,
  update_time timestamp,
  delete_time timestamp,
  constraint todo_fk foreign key (user_id) REFERENCES public.users(user_id)
);

-- insert initial data
insert into public.users(user_id,name,password,create_time)
values (1,'s','s',current_timestamp);
