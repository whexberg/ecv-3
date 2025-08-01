CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Enable UUID extension if not already enabled

CREATE TABLE IF NOT EXISTS board_members
(
    id         UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
    name       TEXT NOT NULL,
    position   TEXT NOT NULL,
    image      TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_board_members_updated_at_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS board_members_updated_at ON board_members;
CREATE TRIGGER board_members_updated_at
    BEFORE UPDATE
    ON board_members
    FOR EACH ROW
EXECUTE PROCEDURE update_board_members_updated_at_column();

INSERT INTO board_members (id, name, position, image)
VALUES ('b6a1a870-0586-4a43-81fc-1d4383bf3eaf',
        'Chaconky',
        'Board Member',
        './images/board/6030/chaconky_cropped.jpeg');

INSERT INTO board_members (id, name, position, image)
VALUES ('ca65c9a4-33ac-4508-896f-cfeebbcec6b8',
        'Horn Belly',
        'Board Member',
        './images/board/6030/hornbelly.jpeg');

INSERT INTO board_members (id, name, position, image)
VALUES ('8f2328bf-100d-4273-aa94-4bd41b3891d9',
        'Monk',
        'Board Member',
        './images/board/6030/monk.jpg');

INSERT INTO board_members (id, name, position, image)
VALUES ('2b6c2227-3ec9-4e0e-813d-b43be6e25365',
        'Cakewalk',
        'Clampatriarch',
        './images/board/6030/cakewalk_cropped.jpg');

INSERT INTO board_members (id, name, position, image)
VALUES ('b267bea2-0a1b-4abd-a5b6-350205fc52dd',
        'Pathogen',
        'Cyber Recorder',
        './images/board/6030/missing.png');

INSERT INTO board_members (id, name, position, image)
VALUES ('941d1895-9780-4ccb-b53b-ee104728aee8',
        'Tennis Ball',
        'Damned Fool Door Keep',
        './images/board/6030/tennisball_cropped.jpeg');

INSERT INTO board_members (id, name, position, image)
VALUES ('8329e0f9-6b03-4662-835b-bae2b0f7d224',
        'Barf',
        'Gold Dust Receiver',
        './images/board/6030/barf_cropped.jpeg');

INSERT INTO board_members (id, name, position, image)
VALUES ('1f56f6f7-8458-4de8-98a8-02887e8d1437',
        'Tik Tok',
        'Hangman',
        './images/board/6030/tiktok_cropped.jpeg');

INSERT INTO board_members (id, name, position, image)
VALUES ('1edab1ba-358f-4026-9326-9fbf5a2d174e',
        'KURTeous MAXIMVS',
        'Historian Emeritus',
        './images/board/6030/missing.png');

INSERT INTO board_members (id, name, position, image)
VALUES ('04606258-4f39-4a55-a6d6-f4b514d37151',
        'Stilts',
        'Historian',
        './images/board/6030/stilts_cropped.jpeg');

INSERT INTO board_members (id, name, position, image)
VALUES ('020a2011-652e-463c-8997-c83dbb30f241',
        'Budman Also',
        'Humbug',
        './images/board/6030/budman_also_cropped.JPG');

INSERT INTO board_members (id, name, position, image)
VALUES ('452f7c0a-a8ed-4503-9dfb-038a603be789',
        'Biggins',
        'Recorder',
        './images/board/6030/biggins_cropped.jpeg');

INSERT INTO board_members (id, name, position, image)
VALUES ('45adbc87-d7e1-45c0-993e-2135a91a2093',
        'Rock Bottom',
        'Vice Humbug',
        './images/board/6030/rock_bottom_cropped.jpg');
