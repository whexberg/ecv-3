-- Down Migration: Drop calendar_events table and related objects
-- Date: 2025-06-22

-- Drop the trigger first
DROP TRIGGER IF EXISTS calendar_events_updated_at ON calendar_events;

-- Drop indexes
DROP INDEX IF EXISTS idx_calendar_events_start_time;
DROP INDEX IF EXISTS idx_calendar_events_recurrence;
DROP INDEX IF EXISTS idx_calendar_events_is_all_day;

-- Drop the table
DROP TABLE IF EXISTS calendar_events;