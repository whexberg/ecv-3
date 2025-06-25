-- Insert CalendarEvent data into calendar_events table

INSERT INTO calendar_events (id, title, description, location, is_all_day, start_time, end_time, recurrence, meta)
VALUES
-- Bean Feed (2025-02-08)
('6ae11dc1-6f48-456e-a32e-a96f6bdd0251',
 'Bean Feed',
 'The 43rd Annual Bean Feed and Hawkers'' Faire will be held at 1273 High Street, Auburn, CA. Cost: $40 at the door.',
 '1273 High Street, Auburn, CA.',
 FALSE,
 '2025-02-08T07:03:00.000-08:00',
 NULL,
 NULL,
 '{}'),

-- Spring Doins (2025-04-25)
('bb63b259-8c5c-4c65-ac61-5626cdd38a50',
 'Spring Doins',
 'The Return to Foresthill!',
 'Foresthill',
 TRUE,
 '2025-04-25T07:03:00.000Z',
 '2025-04-25T23:59:59.999Z',
 'yearly',
 '{"links":[{"text": "Event Page", "url": "/events/6030-spring-doins"}]}'),

-- Spring Doins (2025-04-26)
('1f166898-490b-4541-8e57-74efaaea13b0',
 'Spring Doins',
 'The Return to Foresthill!',
 'Foresthill',
 TRUE,
 '2025-04-26T00:00:00.000Z',
 '2025-04-26T23:59:59.999Z',
 'yearly',
 '{"links":[{"text": "Event Page", "url": "/events/6030-spring-doins"}]}'),

-- Spring Doins (2025-04-27)
('943e9edb-6566-4f74-b8e4-a4a7e58ec891',
 'Spring Doins',
 'The Return to Foresthill!',
 'Foresthill',
 TRUE,
 '2025-04-27T00:00:00.000Z',
 '2025-04-27T23:59:59.999Z',
 'yearly',
 '{"links":[{"text": "Event Page", "url": "/events/6030-spring-doins"}]}'),

-- Grand Council (2025-05-16)
('147d7ba7-9a17-4981-8c94-47f439fd0d4a',
 'Grand Council',
 '',
 '',
 TRUE,
 '2025-05-16T',
 NULL,
 NULL,
 '{}'),

-- Grand Council (2025-05-17)
('4efc2059-1ca6-4d09-ab4f-305256d1ad87',
 'Grand Council',
 '',
 '',
 TRUE,
 'TBD',
 NULL,
 NULL,
 '{}'),

-- Grand Council (2025-05-18)
('ebdba01a-3412-4d24-9fd7-9efd5e01086a',
 'Grand Council',
 '',
 '',
 TRUE,
 'TBD',
 NULL,
 NULL,
 '{}'),

-- Pioneer Day Parade (2025-06-01)
('55489448-83b4-4e92-a7fa-25d32da68fba',
 'Pioneer Day Parade',
 '',
 'Meadow Vista',
 FALSE,
 'TBD',
 NULL,
 NULL,
 '{}'),

-- Family Picnic (2025-06-14)
('e7e37769-7ecf-40fd-bea7-73756257e44a',
 'Family Picnic',
 '',
 'TBD',
 FALSE,
 'TBD',
 NULL,
 NULL,
 '{}'),

-- Wyoming 3-Way (2025-06-27)
('46abb52f-9e97-4b8d-91d6-759dab9712d8',
 'Wyoming 3-Way',
 '',
 'Somewhere in Wyoming',
 TRUE,
 'TBD',
 NULL,
 NULL,
 '{}'),

-- Wyoming 3-Way (2025-06-28)
('0feb748a-a1f2-4ae5-9017-f10d1e996167',
 'Wyoming 3-Way',
 '',
 'Somewhere in Wyoming',
 TRUE,
 'TBD',
 NULL,
 NULL,
 '{}'),

-- Wyoming 3-Way (2025-06-29)
('e0e1a195-af1c-48fe-b9a6-9a5add1ec496',
 'Wyoming 3-Way',
 '',
 'Somewhere in Wyoming',
 TRUE,
 'TBD',
 NULL,
 NULL,
 '{}'),

-- 4th of July Parade (2025-07-04)
('1f79098a-5a33-43d9-b483-fced3d9a0ba2',
 '4th of July Parade',
 'Foresthill''s annual 4th of July parade',
 'Foresthill',
 FALSE,
 'TBD',
 NULL,
 NULL,
 '{}'),

-- T.R.A.S.H. (2025-07-11)
('48324ee6-0398-46a8-91f1-b9bf4c9246f8',
 'T.R.A.S.H.',
 '',
 'Nobody knows',
 FALSE,
 'TBD',
 NULL,
 NULL,
 '{}'),

-- T.R.A.S.H. (2025-07-12)
('903343a5-315e-4485-ae17-4200d10ff02f',
 'T.R.A.S.H.',
 '',
 'Nobody knows',
 FALSE,
 'TBD',
 NULL,
 NULL,
 '{}'),

-- T.R.A.S.H. (2025-07-13)
('60b409ce-7b24-4741-a586-ecdea7a858fb',
 'T.R.A.S.H.',
 '',
 'Nobody knows',
 FALSE,
 'TBD',
 NULL,
 NULL,
 '{}'),

-- Receiving Home Toy Drive (2025-12-06)
('e34ad4f3-686e-4be3-b8ed-048a3c90d2f3',
 'Receiving Home Toy Drive',
 'Let''s make it a Merry Christmas for the kids!',
 'Walmart',
 FALSE,
 'TBD',
 NULL,
 'yearly',
 '{}');