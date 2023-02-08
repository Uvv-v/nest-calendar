create table if not exists file_descriptor
(
    id   uuid unique default gen_random_uuid(),
    name varchar,
    size bigint,
    path varchar,
    type varchar
);

create table if not exists "user"
(
    id       uuid unique primary key default gen_random_uuid(),
    name     varchar,
    surname  varchar,
    username varchar,
    email    varchar,
    avatar_file_id uuid references file_descriptor(id)
);

create table if not exists "event"
(
    id                      uuid unique default gen_random_uuid(),
    title                   varchar,
    description             varchar,
    member_count            int,
    registration_start_date timestamp,
    registration_end_date   timestamp,
    conduct_start_date      timestamp,
    conduct_end_date        timestamp,
    file_id uuid references file_descriptor(id)
);

create table if not exists "user_event"
(
    user_id  uuid references "user" (id) on update cascade on delete cascade,
    event_id uuid references "event" (id) on update cascade on delete cascade,
    constraint user_event_pkey primary key (user_id, event_id)
);
