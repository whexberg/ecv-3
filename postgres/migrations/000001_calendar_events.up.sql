CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Enable UUID extension if not already enabled

CREATE TABLE IF NOT EXISTS calendar_events
(
    id          UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
    title       TEXT  NOT NULL,
    description TEXT  NOT NULL           DEFAULT '',
    location    TEXT  NOT NULL           DEFAULT '',

    -- Original event timing
    start_time  TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    end_time    TIMESTAMP WITH TIME ZONE DEFAULT NULL,

    -- Recurrence fields (nullable = non-recurring)
    frequency   TEXT                     DEFAULT NULL, -- e.g. 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'
    interval    INT                      DEFAULT NULL, -- every N units of frequency (e.g. every 2 weeks)
    byweekday   TEXT[]                   DEFAULT NULL, -- e.g. ['MO', 'WE']
    bymonthday  INT[]                    DEFAULT NULL, -- e.g. [1, 15]
    bymonth     INT[]                    DEFAULT NULL, -- e.g. [12] for December
    byday       TEXT[]                   DEFAULT NULL, -- e.g. ['1FR','3FR'] First and third friday
    byhour      SMALLINT                 DEFAULT NULL, -- e.g. 0-23
    byminute    SMALLINT                 DEFAULT NULL, -- e.g. 0-59
    bysecond    SMALLINT                 DEFAULT NULL, -- e.g. 0-59
    until       TIMESTAMP WITH TIME ZONE DEFAULT NULL, -- optional end to recurrence
    count       INT                      DEFAULT NULL, -- optional limit to number of recurrences

    meta        JSONB NOT NULL           DEFAULT '{}',
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_calendar_events_start_date ON calendar_events (end_time);
CREATE INDEX IF NOT EXISTS idx_calendar_events_start_date ON calendar_events (start_time);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS calendar_events_updated_at ON calendar_events;
CREATE TRIGGER calendar_events_updated_at
    BEFORE UPDATE
    ON calendar_events
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();