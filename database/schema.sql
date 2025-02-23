-- Drop existing tables if they exist
drop table if exists "public"."tasks";
drop table if exists "public"."projects";
drop table if exists "public"."profiles";

-- Drop existing triggers if they exist
drop trigger if exists handle_updated_at on profiles;
drop trigger if exists handle_updated_at on projects;
drop trigger if exists handle_updated_at on tasks;

-- Drop existing function if it exists
drop function if exists handle_updated_at();
drop function if exists handle_new_user();

-- Create profiles table to extend user data
create table "public"."profiles" (
    "id" uuid references auth.users(id) not null primary key,
    "email" text not null,
    "full_name" text,
    "avatar_url" text,
    "created_at" timestamptz default now() not null,
    "updated_at" timestamptz default now() not null
);

-- Create projects table
create table "public"."projects" (
    "id" uuid default gen_random_uuid() primary key,
    "name" text not null,
    "description" text,
    "owner_id" uuid references auth.users(id) not null,
    "is_public" boolean default false,
    "created_at" timestamptz default now() not null,
    "updated_at" timestamptz default now() not null
);

-- Create tasks table
create table "public"."tasks" (
    "id" uuid default gen_random_uuid() primary key,
    "title" text not null,
    "description" text,
    "status" text default 'pending' check (status in ('pending', 'in_progress', 'completed', 'cancelled')),
    "priority" smallint default 1 check (priority between 1 and 5),
    "project_id" uuid references public.projects(id) on delete cascade,
    "assigned_to" uuid references auth.users(id),
    "due_date" timestamptz,
    "created_at" timestamptz default now() not null,
    "updated_at" timestamptz default now() not null
);

-- Create updated_at trigger function
create function handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger handle_updated_at
    before update on profiles
    for each row
    execute procedure handle_updated_at();

create trigger handle_updated_at
    before update on projects
    for each row
    execute procedure handle_updated_at();

create trigger handle_updated_at
    before update on tasks
    for each row
    execute procedure handle_updated_at();

-- Enable Row Level Security
alter table "public"."profiles" enable row level security;
alter table "public"."projects" enable row level security;
alter table "public"."tasks" enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
    on profiles for select
    using (auth.uid() = id);

create policy "Users can update their own profile"
    on profiles for update
    using (auth.uid() = id);

-- Projects policies
create policy "Anyone can view public projects"
    on projects for select
    using (is_public = true);

create policy "Users can view their own projects"
    on projects for select
    using (auth.uid() = owner_id);

create policy "Users can create projects"
    on projects for insert
    with check (auth.uid() = owner_id);

create policy "Users can update their own projects"
    on projects for update
    using (auth.uid() = owner_id);

create policy "Users can delete their own projects"
    on projects for delete
    using (auth.uid() = owner_id);

-- Tasks policies
create policy "Users can view tasks in their projects"
    on tasks for select
    using (
        project_id in (
            select id from projects
            where owner_id = auth.uid() or is_public = true
        )
    );

create policy "Users can create tasks in their projects"
    on tasks for insert
    with check (
        project_id in (
            select id from projects
            where owner_id = auth.uid()
        )
    );

create policy "Users can update tasks in their projects"
    on tasks for update
    using (
        project_id in (
            select id from projects
            where owner_id = auth.uid()
        )
    );

create policy "Users can delete tasks in their projects"
    on tasks for delete
    using (
        project_id in (
            select id from projects
            where owner_id = auth.uid()
        )
    );

-- Create indexes for better performance
create index projects_owner_id_idx on projects(owner_id);
create index tasks_project_id_idx on tasks(project_id);
create index tasks_assigned_to_idx on tasks(assigned_to);
create index tasks_status_idx on tasks(status);

-- Function to handle new user profiles
create function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, email, full_name, avatar_url)
    values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
    return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically create profile for new users
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
