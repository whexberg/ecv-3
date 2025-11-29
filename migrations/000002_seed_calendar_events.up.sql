-- Insert CalendarEvent data into calendar_events table

INSERT INTO recurrence_rules (id, label, frequency, interval, by_day)
VALUES ('41911e75-735c-42cf-a30e-9afc33afc9aa', '1st Friday', 'MONTHLY', 1, ARRAY ['1FR']);
INSERT INTO recurrence_rules (id, label, frequency, interval, by_day)
VALUES ('825ee271-44bb-4b48-a77d-bd0f0ddd9369', '3rd Friday', 'MONTHLY', 1, ARRAY ['3FR']);

INSERT INTO calendar_events (id, title, description, location, start_datetime, end_datetime, recurrence_rule_id)
VALUES ('0f18fc61-c828-478b-8ec2-5239bd1b1cd3', 'Board Meeting', 'Monthly board meeting', 'Gold Hill Grange Hall',
        '2025-01-01 20:03:00.000', '2025-01-01 21:03:00.000', '41911e75-735c-42cf-a30e-9afc33afc9aa'),
       ('ae8d0998-4348-4b0b-9ff3-71582d0860f1', 'General Meeting', 'Monthly general meeting', 'Gold Hill Grange Hall',
        '2025-01-01 20:03:00.000', '2025-01-01 21:03:00.000', '825ee271-44bb-4b48-a77d-bd0f0ddd9369');

INSERT INTO calendar_events (id, title, description, location, start_datetime, end_datetime)
VALUES ('6ae11dc1-6f48-456e-a32e-a96f6bdd0251', 'Bean Feed',
        'The 43rd Annual Bean Feed and Hawkers Faire will be held at 1273 High Street, Auburn, CA. Cost: $40 at the door.',
        '1273 High Street, Auburn, CA.', '2025-02-07 07:03:00.000', '2025-02-07 16:03:00.000');

INSERT INTO calendar_events (id, title, description, location, start_datetime, end_datetime, meta)
VALUES ('bb63b259-8c5c-4c65-ac61-5626cdd38a50', 'Spring Doins', 'The Return to Foresthill!', 'Foresthill',
        '2025-04-25 07:03:00.000', '2025-04-27 07:03:00.000', '{
    "links": [
      {
        "text": "Event Page",
        "url": "/events/6030-spring-doins"
      }
    ]
  }');

INSERT INTO calendar_events (id, title, start_datetime, end_datetime)
VALUES ('147d7ba7-9a17-4981-8c94-47f439fd0d4a', 'Grand Council', '2025-05-16 00:00:00.000',
        '2025-05-18T23:59:59.999');

INSERT INTO calendar_events (id, title, location, start_datetime, end_datetime, meta)
VALUES ('55489448-83b4-4e92-a7fa-25d32da68fba', 'Pioneer Day Parade', 'Meadow Vista', '2025-06-01 00:00:00.000',
        '2025-06-01 00:00:00.000', '{
    "time_tbd": true
  }');


INSERT INTO calendar_events (id, title, location, start_datetime, end_datetime)
VALUES ('46abb52f-9e97-4b8d-91d6-759dab9712d8', 'Wyoming 3-Way', 'Somewhere in Wyoming',
        '2025-06-27 00:00:00.000', '2025-06-29 23:59:59.999');

INSERT INTO calendar_events (id, title, description, location, start_datetime, end_datetime)
VALUES ('1f79098a-5a33-43d9-b483-fced3d9a0ba2', '4th of July Parade', 'Annual Foresthill 4th of July parade',
        'Foresthill', '2025-07-04 07:03:00.000', '2025-07-04 12:00:00.000');

INSERT INTO calendar_events (id, title, description, location, start_datetime, end_datetime)
VALUES ('48324ee6-0398-46a8-91f1-b9bf4c9246f8', 'T.R.A.S.H.', '', 'Nobody knows', '2025-07-11 00:00:00.000',
        '2025-07-13 23:59:59.999');

INSERT INTO calendar_events (id, title, start_datetime, end_datetime)
VALUES ('bd09f1b2-8fbf-4b9e-bd35-09febf522ec0', 'Fall Doins', '2025-09-19 00:00:00.000',
        '2025-09-21 12:00:00.000');

INSERT INTO calendar_events (id, title)
VALUES ('3c5fc8f9-ff4a-4188-9df7-19b852edf7ee', 'Family Campout');

INSERT INTO calendar_events (id, title, start_datetime, end_datetime)
VALUES ('95f3516c-b139-40a8-bf8c-b1e258372a1a', 'Widder''s Ball', '2025-11-08 20:03:00.000',
        '2025-11-08 22:00:00.000');

INSERT INTO recurrence_rules (id, label, frequency, interval, by_month, by_day)
VALUES ('c1b4210e-3c2f-416e-b332-2be8846af01e', '1st Saturday in December', 'YEARLY', 1, Array [12], ARRAY ['1SA']);

INSERT INTO calendar_events (id, title, description, location, start_datetime, recurrence_rule_id)
VALUES ('025fed3c-614f-48bb-a283-858bebab94bc', 'Receiving Home Toy Drive',
        'Lets make it a Merry Christmas for the kids!', 'Walmart in Roseville',
        '2025-12-06 07:03:00.000', 'c1b4210e-3c2f-416e-b332-2be8846af01e');

INSERT INTO calendar_events (id, title, start_datetime, end_datetime)
VALUES ('9bca4f62-9a80-42e5-96ac-39021f8d08db', 'Christmas Party', '2025-12-19 20:03:00.000',
        '2025-12-19 21:03:00.000');

INSERT INTO calendar_events (id, title, start_datetime, end_datetime)
VALUES ('c54cd3f4-9d2e-494b-9539-1ed9b6823cf2', 'Election Night', '2026-01-16 20:03:00.000',
        '2026-01-16 21:03:00.000');

INSERT INTO calendar_events (id, title, start_datetime, end_datetime)
VALUES ('a4534035-9286-4d22-974b-e86d17bd4cc2', 'Bean Feed', '2026-02-07 07:03:00.000', '2026-02-07 15:03:00.000');

INSERT INTO calendar_events (id, title, start_datetime, end_datetime)
VALUES ('a6795046-f3bd-43ab-abe3-a380a1e42c94', 'Spring Doins', '2026-04-17 07:03:00.000', '2026-04-19 15:03:00.000');

INSERT INTO calendar_events (id, title, description, location, start_datetime, end_datetime)
VALUES ('471ad577-0343-4a88-beb1-fc27246dc288', 'LSD3 Gentleman''s Initiation',
        'LSD3 is having a gentleman''s initiation! There will be street tacos for donation and a 50/50 raffle! Widders are welcome! This is a great opportunity to bring in older or disabled PBC''s',
        'Everybody''s Inn 19420 Foresthill Rd, Foresthill, Ca.', '2025-08-23 10:03:00.000',
        '2025-08-23 14:03:00.000');

INSERT INTO calendar_events (id, title, description, location, start_datetime, end_datetime)
VALUES ('e7e37769-7ecf-40fd-bea7-73756257e44a', 'LSD#3 Family Picnic and Camp Out',
        'ECV LSD3 Foresthill Family Camp Out! Bring the whole family out for a weekend of fun under the stars at the ECV LSD3 Foresthill Overnight Family Camp Out! Whether you’re staying the night or just dropping by for the day, there’s something for everyone!',
        'Blackhawk Rd, Foresthill, CA.', '2025-08-16 11:00:00.000',
        '2025-08-17 11:00:00.000');