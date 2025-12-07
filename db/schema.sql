PRAGMA foreign_keys = ON;

-- ============================================================
-- RECURRENCE RULES
-- ============================================================
CREATE TABLE
    event_recurrence (
        id TEXT PRIMARY KEY,
        label TEXT NOT NULL,
        rrule TEXT NOT NULL,
        dtstart TEXT NOT NULL,
        tzid TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime ('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime ('now'))
    );

CREATE TRIGGER event_recurrence_updated_at AFTER
UPDATE ON event_recurrence FOR EACH ROW BEGIN
UPDATE event_recurrence
SET
    updated_at = CURRENT_TIMESTAMP
WHERE
    id = OLD.id;

END;

-- ============================================================
-- CALENDAR EVENTS
-- ============================================================
CREATE TABLE
    calendar_events (
        id TEXT PRIMARY KEY, -- UUID
        title TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        location TEXT NOT NULL DEFAULT '',
        start_at TEXT DEFAULT NULL, -- ISO8601 string
        end_at TEXT DEFAULT NULL,
        all_day INTEGER NOT NULL DEFAULT 0,
        timezone TEXT NOT NULL DEFAULT 'America/Los_Angeles',
        event_type TEXT NOT NULL DEFAULT 'other' CHECK (
            event_type IN (
                'meeting',
                'doins',
                'picnic',
                'ceremony',
                'social',
                'fundraiser',
                'historical',
                'other'
            )
        ),
        is_members_only INTEGER NOT NULL DEFAULT 0,
        is_published INTEGER NOT NULL DEFAULT 0,
        content TEXT NOT NULL DEFAULT '{}' CHECK (json_valid (content)),
        meta TEXT NOT NULL DEFAULT '{}' CHECK (json_valid (meta)),
        created_at TEXT NOT NULL DEFAULT (datetime ('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime ('now'))
    );

CREATE INDEX idx_calendar_event_start ON calendar_events (start_at);

CREATE INDEX idx_calendar_event_end ON calendar_events (end_at);

CREATE INDEX idx_calendar_event_event_type ON calendar_events (event_type);

CREATE INDEX idx_calendar_event_is_published ON calendar_events (is_published);

-- ============================================================
-- UPDATED_AT TRIGGER (SQLite version)
-- ============================================================
CREATE TRIGGER calendar_events_updated_at AFTER
UPDATE ON calendar_events FOR EACH ROW BEGIN
UPDATE calendar_events
SET
    updated_at = CURRENT_TIMESTAMP
WHERE
    id = OLD.id;

END;

-- ============================================================
-- LINK EVENT AND RECURRENCE ROWS
-- ============================================================
CREATE TABLE
    event_recurrence_link (
        event_id TEXT NOT NULL REFERENCES calendar_events (id) ON DELETE CASCADE,
        recurrence_rule_id TEXT NOT NULL REFERENCES event_recurrence (id) ON DELETE CASCADE,
        PRIMARY KEY (event_id, recurrence_rule_id)
    );

-- ============================================================
-- CONTACTS
-- ============================================================
CREATE TABLE
    calendar_event_contacts (
        id TEXT PRIMARY KEY,
        calendar_event_id TEXT NOT NULL REFERENCES calendar_events (id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime ('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime ('now'))
    );

CREATE UNIQUE INDEX idx_calendar_event_contact_unique ON calendar_event_contacts (calendar_event_id, email);

-- ============================================================
-- ATTACHMENTS
-- ============================================================
CREATE TABLE
    calendar_event_attachments (
        id TEXT PRIMARY KEY,
        calendar_event_id TEXT NOT NULL REFERENCES calendar_events (id) ON DELETE CASCADE,
        filename TEXT NOT NULL,
        file_url TEXT,
        file_type TEXT CHECK (
            file_type IN ('image', 'pdf', 'document', 'other')
        ),
        description TEXT,
        display_order INTEGER DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime ('now'))
    );

CREATE INDEX idx_calendar_event_attachment_event_id ON calendar_event_attachments (calendar_event_id);

-- ============================================================
-- RECURRENCE EXCEPTIONS
-- ============================================================
CREATE TABLE
    recurrence_exceptions (
        id TEXT PRIMARY KEY,
        calendar_event_id TEXT NOT NULL REFERENCES calendar_events (id) ON DELETE CASCADE,
        date TEXT NOT NULL, -- ISO8601 date
        reason TEXT DEFAULT ''
    );

CREATE UNIQUE INDEX idx_recurrence_exceptions_unique ON recurrence_exceptions (calendar_event_id, date);

-- ============================================================
-- RECURRENCE ADDITIONS
-- ============================================================
CREATE TABLE
    recurrence_additions (
        id TEXT PRIMARY KEY,
        calendar_event_id TEXT NOT NULL REFERENCES calendar_events (id) ON DELETE CASCADE,
        date TEXT NOT NULL,
        reason TEXT DEFAULT ''
    );

CREATE UNIQUE INDEX idx_recurrence_additions_unique ON recurrence_additions (calendar_event_id, date);