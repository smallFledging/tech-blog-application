insert into category (category_name)
values 
('Tech'),
('Finance'),
('Cute');

insert into user (email, password, name)
values
('test@test.com', '$2a$10$4.ZkTP/TRUIwBJk8bKfU0eSOz3EXqiGJhhjC4lVoM1VIiZ37ecdje', 'Test');

insert into post (post_name, post_content, category_id, user_id)
values
('Cat love','I think cats are the greatest. The OG of the internet.', 3, 1);