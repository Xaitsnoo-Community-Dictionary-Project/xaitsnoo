-- Create a new type to generate UUIDs automatically
create extension if not exists "uuid-ossp";

create domain autouuid uuid default uuid_generate_v4 ();

-- List of grammatical types
CREATE TYPE grammar as enum (
    'noun',
    'verb',
    'adjective'
);

-- The main table listing lexeme entries
CREATE TABLE entries (
    uuid autouuid primary key,
    headword text not null,
    translation text not null,
    notes text,
    grammar grammar[]
);

-- Lists variants that may exist for a word entry
CREATE TABLE variants (
    uuid autouuid primary key,
    variant text not null, 
    context text,
    entry_id uuid not null,
    FOREIGN KEY (entry_id) REFERENCES entries(uuid)
);

-- Lists speakers
CREATE TABLE speakers (
    uuid autouuid primary key,
    name text not null
);

-- Connects a word entry with its speaker(s)
CREATE TABLE entry_speaker_association (
    entry_id uuid not null,
    speaker_id uuid not null,
    FOREIGN KEY (entry_id) REFERENCES entries(uuid),
    FOREIGN KEY (speaker_id) REFERENCES speakers(uuid)
);

-- lists meaning categories
CREATE TABLE meaning (
    uuid autouuid primary key,
    meaning_category text not null
);

-- Links a word entry with its meaning category(s)
CREATE TABLE entry_meaning_association (
    entry_id uuid not null,
    meaning_category_id uuid not null,
    FOREIGN KEY (entry_id) REFERENCES entries(uuid),
    FOREIGN KEY (meaning_category_id) REFERENCES meaning(uuid)
);

-- Audio files from wherever it's floating around
CREATE TABLE audio (
    uuid autouuid primary key,
    audio_file text not null
);

-- Connects a word entry with its audio file(s)
CREATE TABLE entry_audio_association (
    entry_id uuid not null,
    audio_file_id uuid not null,
    FOREIGN KEY (entry_id) REFERENCES entries(uuid),
    FOREIGN KEY (audio_file_id) REFERENCES audio(uuid)
);

-- Photo files from wherever
CREATE TABLE photo (
    uuid autouuid primary key,
    photo_file text not null
);

-- Connects a word entry with its photo file(s)
CREATE TABLE entry_photo_association (
    entry_id uuid not null,
    photo_file_id uuid not null,
    FOREIGN KEY (entry_id) REFERENCES entries(uuid),
    FOREIGN KEY (photo_file_id) REFERENCES photo(uuid)
);
