CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Enable UUID extension if not already enabled

CREATE TABLE IF NOT EXISTS calendar_events
(
    id          UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
    title       TEXT    NOT NULL         DEFAULT '',
    description TEXT    NOT NULL         DEFAULT '',
    location    TEXT    NOT NULL         DEFAULT '',
    start_date  TEXT    NOT NULL         DEFAULT 'TBD',
    start_time  TEXT    NOT NULL         DEFAULT 'TBD',
    end_date    TEXT    NOT NULL         DEFAULT 'TBD',
    end_time    TEXT    NOT NULL         DEFAULT 'TBD',
    meta        JSONB   NOT NULL         DEFAULT '{}',
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_calendar_events_start_date ON calendar_events (end_date);
CREATE INDEX IF NOT EXISTS idx_calendar_events_start_date ON calendar_events (start_date);
CREATE INDEX IF NOT EXISTS idx_calendar_events_start_time ON calendar_events (end_time);
CREATE INDEX IF NOT EXISTS idx_calendar_events_start_time ON calendar_events (start_time);

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