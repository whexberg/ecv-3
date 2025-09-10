DROP TRIGGER IF EXISTS calendar_events_updated_at ON calendar_events;

DROP INDEX IF EXISTS idx_recurrence_exceptions_unique;
DROP INDEX IF EXISTS idx_recurrence_exceptions_unique;
DROP INDEX IF EXISTS idx_calendar_event_attachment_event_id;
DROP INDEX IF EXISTS idx_calendar_event_contact_unique;
DROP INDEX IF EXISTS idx_calendar_events_start_time;
DROP INDEX IF EXISTS idx_calendar_events_recurrence;
DROP INDEX IF EXISTS idx_calendar_events_is_all_day;

DROP TABLE IF EXISTS recurrence_additions;
DROP TABLE IF EXISTS recurrence_exceptions;
DROP TABLE IF EXISTS calendar_event_attachments;
DROP TABLE IF EXISTS calendar_event_contacts;
DROP TABLE IF EXISTS calendar_events_contacts;
DROP TABLE IF EXISTS calendar_events;
DROP TABLE IF EXISTS recurrence_rules;

DROP FUNCTION IF EXISTS is_valid_timezone;
