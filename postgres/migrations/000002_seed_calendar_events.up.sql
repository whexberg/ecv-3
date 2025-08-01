-- Insert CalendarEvent data into calendar_events table


INSERT INTO calendar_events (id, title, description, location, frequency, interval, byday, byhour, byminute)
VALUES ('0f18fc61-c828-478b-8ec2-5239bd1b1cd3', 'Board Meeting', 'Monthly board meeting.', 'Gold Hill Grange Hall',
        'MONTHLY', 1, ARRAY ['1FR'], 8, 3),
       ('ae8d0998-4348-4b0b-9ff3-71582d0860f1', 'General Meeting', 'Monthly general meeting for chapter members.',
        'Gold Hill Grange Hall', 'MONTHLY', 1, ARRAY ['3FR'], 8, 3);

INSERT INTO calendar_events (id, title, description, location, start_time, end_time)
VALUES ('6ae11dc1-6f48-456e-a32e-a96f6bdd0251', 'Bean Feed',
        'The 43rd Annual Bean Feed and Hawkers Faire will be held at 1273 High Street, Auburn, CA. Cost: $40 at the door.',
        '1273 High Street, Auburn, CA.', '2025-02-08T07:03:00.000-08:00', '2025-02-08T16:03:00.000-08:00');

INSERT INTO calendar_events (id, title, description, location, start_time, end_time, meta)
VALUES ('bb63b259-8c5c-4c65-ac61-5626cdd38a50', 'Spring Doins', 'The Return to Foresthill!', 'Foresthill',
        '2025-04-25T07:03:00.000-07:00', '2025-04-27T07:03:00.000-07:00', '{
    "links": [
      {
        "text": "Event Page",
        "url": "/events/6030-spring-doins"
      }
    ]
  }');

INSERT INTO calendar_events (id, title, start_time, end_time)
VALUES ('147d7ba7-9a17-4981-8c94-47f439fd0d4a', 'Grand Council', '2025-05-16T00:00:00.000-07:00',
        '2025-05-18T23:59:59.999-07:00');

INSERT INTO calendar_events (id, title, location, start_time, end_time, meta)
VALUES ('55489448-83b4-4e92-a7fa-25d32da68fba', 'Pioneer Day Parade', 'Meadow Vista', '2025-06-01T00:00:00.000-07:00',
        '2025-06-01T23:59:59.999-07:00', '{
    "time_tbd": true
  }');

-- Family Picnic (2025-06-14)
INSERT INTO calendar_events (id, title, start_time, end_time, meta)
VALUES ('e7e37769-7ecf-40fd-bea7-73756257e44a', 'Family Picnic', '2025-06-14T00:00:00.000-07:00',
        '2025-06-14T23:59:59.999-07:00', '{
    "time_tbd": true
  }');

-- Wyoming 3-Way (2025-06-27)
INSERT INTO calendar_events (id, title, location, start_time, end_time)
VALUES ('46abb52f-9e97-4b8d-91d6-759dab9712d8', 'Wyoming 3-Way', 'Somewhere in Wyoming',
        '2025-06-27T00:00:00.000-07:00', '2025-06-29T23:59:59.999-07:00');

-- 4th of July Parade (2025-07-04)
INSERT INTO calendar_events (id, title, description, location, start_time, end_time)
VALUES ('1f79098a-5a33-43d9-b483-fced3d9a0ba2', '4th of July Parade', 'Annual Foresthill 4th of July parade',
        'Foresthill', '2025-07-04T07:03:00.000-07:00', '2025-07-04T12:00:00.000-07:00');

-- T.R.A.S.H. (2025-07-11)
INSERT INTO calendar_events (id, title, description, location, start_time, end_time)
VALUES ('48324ee6-0398-46a8-91f1-b9bf4c9246f8', 'T.R.A.S.H.', '', 'Nobody knows', '2025-07-11T00:00:00.000-07:00',
        '2025-07-13T23:59:59.999-07:00');

-- Receiving Home Toy Drive (2025-12-06)
INSERT INTO calendar_events (id, title, description, location, start_time, end_time, frequency, interval, bymonth,
                             byday)
VALUES ('e34ad4f3-686e-4be3-b8ed-048a3c90d2f3', 'Receiving Home Toy Drive',
        'Lets make it a Merry Christmas for the kids!', 'Walmart', '2025-12-06T00:00:00.000-08:00',
        '2025-12-06T23:59:59.999-08:00', 'YEARLY', 1, ARRAY [12], ARRAY ['1SA']);