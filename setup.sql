-------------------------
-- Create a table for Public Profiles
drop table if exists profiles;

create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  display_name text,
  username text unique,
  avatar_url text,
  bio text,

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- setup full text search on profiles
alter table 
  profiles
add column
    fts tsvector generated always as (to_tsvector('english', username || ' ' || display_name)) stored;
  
create index profiles_fts on profiles using gin (fts);

-------------------------
-- Create a table for tags
drop table if exists tags;

create table tags (
  id text not null,
  name text not null,
  image_url text,
  featured boolean,

  primary key (id),
  constraint tags_id_length check (char_length(id) <= 255)
);

alter table tags
  enable row level security;

create policy "Enable access to public" on tags
  for select to authenticated, anon using (true);

create policy "Users can add new tags" on tags
  for insert to authenticated with check (true);

-------------------------
-- Create enum types for post table
drop type if exists post_type;
create type post_type as enum ('article', 'notebook');

-- Create a table for posts
drop table if exists posts;

create table posts (
  id bigint generated by default as identity primary key,
  slug text not null,
  body_markdown text,
  emoji text not null,
  title text not null,
  can_others_comment boolean default true not null,
  comment_count int default 0 not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  
  post_type post_type default 'article' not null,

  -- article specific fields
  published boolean default false not null,
  published_at timestamp with time zone,
  reading_time int,
  view_count bigint default 0 not null,
  like_count bigint default 0 not null,

  -- scribble specific fields
  closed boolean default false not null,
  closed_at timestamp with time zone,  

  user_id uuid not null,
  foreign key (user_id) references profiles(id) on delete cascade
);

alter table posts
  enable row level security;

create policy "Users can create post" on posts
  for insert to authenticated with check (auth.uid() = user_id);

create policy "Enable access to published post to all users" on posts
  for select to authenticated, anon using (published = true);

create policy "Users can access their own posts" on posts
  for select to authenticated using (auth.uid() = user_id);

create policy "Users can delete their own post" on posts
  for delete to authenticated using (auth.uid() = user_id);

create policy "Users can update their own posts" on posts
  for update to authenticated using (auth.uid() = user_id);

-- Setup full text search on posts
alter table
  posts
add column
  fts tsvector generated always as (to_tsvector('english', title)) stored;

create index posts_fts on posts using gin (fts);

----------------------
-- Create a table for comments
drop table if exists post_comments;

create table post_comments (
  id bigint generated by default as identity primary key,
  posts_id bigint not null,
  user_id uuid not null,
  parent_comment_id bigint,
  comment_value text not null,
  created_at timestamp with time zone default now() not null,

  foreign key (posts_id) references posts(id) on delete cascade,
  foreign key (user_id) references profiles(id) on delete cascade,
  foreign key (parent_comment_id) references post_comments(id) on delete cascade
);

alter table post_comments
  enable row level security;

create policy "Enable read to public" on post_comments
  for select to authenticated, anon using (true);

create policy "Post owners can delete comments" on post_comments
  for delete to authenticated using (
    exists ( select posts.user_id
      from posts
      where posts.id = post_comments.posts_id and posts.user_id = auth.uid()
    )
  );

create policy "Users can comment" on post_comments
  for insert to authenticated with check (auth.uid() = user_id);

create policy "Users can delete their own comment" on post_comments
  for delete to authenticated using (auth.uid() = user_id);


-------------------------
-- Create a table for Likes

drop table if exists post_likes;

create table post_likes (
  id bigint generated by default as identity primary key,
  posts_id bigint not null,
  user_id uuid not null,
  created_at timestamp with time zone default now() not null,

  foreign key (posts_id) references posts(id) on delete cascade,
  foreign key (user_id) references profiles(id) on delete cascade
);

alter table post_likes
  enable row level security;

create policy "Enable access to public" on post_likes
  for select to authenticated, anon using (true);

create policy "Users can like post" on post_likes
  for insert to authenticated with check (auth.uid() = user_id);

create policy "Users can unlike post" on post_likes
  for delete to authenticated using (auth.uid() = user_id);

-------------------------
-- Create a table for post tagging

drop table if exists post_tag;

create table post_tag (
  id bigint generated by default as identity primary key,
  posts_id bigint not null,
  user_id uuid not null,
  tags_id text not null,
  created_at timestamp with time zone default now() not null,

  foreign key (posts_id) references posts(id) on delete cascade,
  foreign key (user_id) references profiles(id) on delete cascade,
  foreign key (tags_id) references tags(id) on delete cascade,
  unique (posts_id, tags_id)
);

alter table post_tag
  enable row level security;

create policy "Enable access to public" on post_tag
  for select to authenticated, anon using (true);

create policy "Users can add tag" on post_tag
  for insert to authenticated with check (auth.uid() = user_id);

create policy "Users can remove tag" on post_tag
  for delete to authenticated using (auth.uid() = user_id);

------------------
-- Setup triggers

-- Create profile for new user
create or replace function public.create_profile_for_new_user()
returns trigger as $$
    begin
        insert into public.profiles (
            id,
            avatar_url
    ) values (
        new.id,
        new.raw_user_meta_data->>'avatar_url'
        );
        return new;
    end;
$$ language plpgsql security definer set search_path = public;

create trigger create_profile_on_signup
after insert on auth.users
for each row execute procedure create_profile_for_new_user();

-- Post published timestamp trigger
create or replace function create_published_date()
  returns trigger as $func$
begin
  if new.published is true 
    then new.published_at = now();
  end if;
  return new;
end;
$func$ language plpgsql;

create trigger handle_insert_published_at
before insert or update on posts
for each row execute procedure create_published_date();

-- Like trigger to update count
create or replace function process_like_count()
  returns trigger as $func$
begin
  if (TG_OP = 'DELETE') then
    if exists (select from posts where id = old.posts_id) then
      update posts
      set like_count = like_count - 1
      where id = old.posts_id;
    end if;
  
  ELSIF (TG_OP = 'INSERT') then
    if exists (select from posts where id = new.posts_id) then
      update posts
      set like_count = like_count + 1
      where id = new.posts_id;
    end if;
  end if;
  return null;
end;
$func$ language plpgsql;

create trigger handle_post_like
after insert or delete on post_likes
for each row execute procedure process_like_count();

-- Comment trigger to update comment_count
create or replace function process_comment_count()
  returns trigger as $func$
begin
  if (TG_OP = 'DELETE') then
    if exists (select from posts where id = old.posts_id) then
      update posts
      set comment_count = comment_count - 1
      where id = old.posts_id;
    end if;

  ELSIF (TG_OP = 'INSERT') THEN
    if exists (select from posts where id = new.posts_id) then
      update posts
      set comment_count = comment_count + 1
      where id = new.posts_id;
    end if;
  end if;
  return null;
end;
$func$ language plpgsql;

create trigger handle_post_comment
after insert or delete on post_comments
for each row execute procedure process_comment_count();

-- Scribble closed date trigger
create or replace function process_closed_date()
  returns trigger as $func$
begin
   if (new.closed = true) then
      new.closed_at = now();
    end if;
    return new;
end;
$func$ language plpgsql;

create trigger handle_post_closed_at
before insert or update on posts
for each row execute procedure process_closed_date();

-- Updated at triggers
create extension if not exists moddatetime schema extensions;
create trigger handle_updated_at before update on posts
for each row execute procedure moddatetime (updated_at);

create trigger handle_updated_at before update on profiles
for each row execute procedure moddatetime (updated_at);

-- Page view function
create or replace function increment_page_view(post_slug TEXT)
returns void
language plpgsql
as $$
begin
  if exists (select from posts where slug = post_slug) then
    update posts
    set view_count = view_count + 1
    where slug = post_slug;
  end if;
end;
$$;

-- Set up Realtime!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime
  add table profiles;

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "User can upload an avatar." on storage.objects
  for insert to authenticated with check ((bucket_id = 'avatar'::text) AND ((uid())::text = (storage.foldername(name))[1]));

create policy "User can update an avatar." on storage.objects
  for update to authenticated with check ((bucket_id = 'avatar'::text) AND ((uid())::text = (storage.foldername(name))[1]));

create policy "User can delete an avatar." on storage.objects
  for delete to authenticated using ((bucket_id = 'avatar'::text) AND (role() = 'authenticated'::text) AND ((uid())::text = (storage.foldername(name))[1]));

-- User post image uploads
insert into storage.buckets (id, name)
  values ('uploads', 'uploads');

create policy "Post images are publicly accessible." on storage.objects
  for select using (bucket_id = 'uploads');

create policy "User can upload an image." on storage.objects
  for insert to authenticated with check ((bucket_id = 'uploads'::text) AND (role() = 'authenticated'::text) AND ((uid())::text = (storage.foldername(name))[1]));

create policy "User can update an image." on storage.objects
  for update to authenticated using ((bucket_id = 'uploads'::text) AND (role() = 'authenticated'::text) AND ((uid())::text = (storage.foldername(name))[1]));

create policy "User can delete an image." on storage.objects
  for delete to authenticated using ((bucket_id = 'uploads'::text) AND (role() = 'authenticated'::text) AND ((uid())::text = (storage.foldername(name))[1]));

insert into storage.buckets (id, name)
  values ('tags', 'tags');
