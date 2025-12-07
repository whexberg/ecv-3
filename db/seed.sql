-- ============================================================
-- SEED FILE FOR CALENDAR EVENTS
-- ============================================================
-- ============================================================
-- RECURRENCE RULES
-- ============================================================
INSERT INTO
    EventRecurrence (id, label, rrule, start, tzid)
VALUES
    (
        '110baa80-d9df-48e0-9bb7-5a347cc6130d',
        'Every first Friday of the month',
        'FREQ=MONTHLY;BYDAY=1FR;BYHOUR=20;BYMINUTE=3',
        '20250101000000',
        'America/Los_Angeles'
    ),
    (
        '78e3deb6-f559-4c91-a9c1-8f62480c86f6',
        'Every third Friday of the month',
        'FREQ=MONTHLY;BYDAY=3FR;BYHOUR=20;BYMINUTE=3',
        '20250101000000',
        'America/Los_Angeles'
    );

-- ============================================================
-- CALENDAR EVENTS
-- ============================================================
INSERT INTO
    CalendarEvent (
        id,
        title,
        description,
        location,
        start_at,
        end_at,
        all_day,
        timezone,
        event_type,
        is_members_only,
        is_published,
        content,
        meta
    )
VALUES
    (
        '2d8bb2bf-43c9-4111-ac4b-c3226f5a2e04',
        'Board Meeting',
        'Monthly board meeting',
        '1405 Gold Hill Rd, Newcastle, CA',
        '2025-02-08T20:03:00',
        '2025-02-08T21:03:00',
        0,
        'America/Los_Angeles',
        'meeting',
        0,
        1,
        '{}',
        '{}'
    ),
    (
        'dbbbe0dc-4bdc-4dcf-beb6-4727de0fd7b8',
        'General Meeting',
        'Monthly general meeting',
        '1405 Gold Hill Rd, Newcastle, CA',
        '2025-02-08T20:03:00',
        '2025-02-08T21:03:00',
        0,
        'America/Los_Angeles',
        'meeting',
        1,
        1,
        '{}',
        '{}'
    );

-- ============================================================
-- LINK EVENT AND RECURRENCE RULES
-- ============================================================
INSERT INTO
    EventRecurrenceLink (event_id, recurrence_rule_id)
VALUES
    (
        '2d8bb2bf-43c9-4111-ac4b-c3226f5a2e04',
        '110baa80-d9df-48e0-9bb7-5a347cc6130d'
    ),
    (
        'dbbbe0dc-4bdc-4dcf-beb6-4727de0fd7b8',
        '78e3deb6-f559-4c91-a9c1-8f62480c86f6',
    );

-- Board meeting has weekly recurrence
-- ============================================================
-- CONTACTS
-- ============================================================
INSERT INTO
    CalendarEventContact (id, calendar_event_id, name, email, phone)
VALUES
    (
        '7db7e5e0-e551-485c-b3be-18a655e2b4be',
        '2d8bb2bf-43c9-4111-ac4b-c3226f5a2e04',
        'Big Johnson',
        'big@example.com',
        '555-1234'
    ),
    (
        '7358ba1a-4c1c-431e-9dee-87d9315a0303',
        '2d8bb2bf-43c9-4111-ac4b-c3226f5a2e04',
        'Bob Smith',
        'bob@example.com',
        '555-5678'
    ),
    (
        'f0bacf25-b797-471f-bc45-f6fe5741a18a',
        'dbbbe0dc-4bdc-4dcf-beb6-4727de0fd7b8',
        'Carol Lee',
        'carol@example.com',
        '555-9012'
    );

-- ============================================================
-- ATTACHMENTS
-- ============================================================
INSERT INTO
    CalendarEventAttachment (
        id,
        calendar_event_id,
        filename,
        file_url,
        file_type,
        description,
        display_order
    )
VALUES
    (
        'abb5aff7-2b9d-472c-84b3-afb6a0402f47',
        '2d8bb2bf-43c9-4111-ac4b-c3226f5a2e04',
        'agenda.pdf',
        'https://example.com/agenda.pdf',
        'pdf',
        'Meeting agenda',
        1
    ),
    (
        '34b03183-7a4b-46a4-be3e-5608abc42af3',
        'dbbbe0dc-4bdc-4dcf-beb6-4727de0fd7b8',
        'map.png',
        'https://example.com/map.png',
        'image',
        'Picnic location map',
        1
    );

-- ============================================================
-- RECURRENCE EXCEPTIONS
-- ============================================================
INSERT INTO
    RecurrenceException (id, calendar_event_id, date, reason)
VALUES
    (
        'a5b1cd76-1889-419e-84a7-33b538a899b3',
        '2d8bb2bf-43c9-4111-ac4b-c3226f5a2e04',
        '2025-03-03T09:00:00',
        'Holiday conflict'
    );

-- ============================================================
-- RECURRENCE ADDITIONS
-- ============================================================
INSERT INTO
    RecurrenceAddition (id, calendar_event_id, date, reason)
VALUES
    (
        '0cc416e4-0141-41a0-b5e3-510d19c9444d',
        '2d8bb2bf-43c9-4111-ac4b-c3226f5a2e04',
        '2025-04-01T09:00:00',
        'Special Board session'
    );