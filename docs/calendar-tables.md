## Core Calendar Tables

### 1. `calendars` - Container for Events
**What it does**: Think of this as your "calendar folders" - like "Work Calendar", "Personal Calendar", "Team Calendar"

**When to use**:
```javascript
// Create a new calendar
INSERT INTO calendars (name, owner_id, color) 
VALUES ('Work Calendar', user_id, '#FF5733');

// List user's calendars
SELECT * FROM calendars WHERE owner_id = user_id OR id IN (
  SELECT calendar_id FROM calendar_permissions WHERE user_id = user_id
);
```

### 2. `events` - The Main Event Data
**What it does**: Stores individual events and serves as the parent for recurring events

**When to use**:
```javascript
// Simple one-time event
INSERT INTO events (title, start_datetime, end_datetime, calendar_id)
VALUES ('Team Meeting', '2025-08-15 10:00:00+00', '2025-08-15 11:00:00+00', calendar_id);

// Recurring event (parent)
INSERT INTO events (title, start_datetime, is_recurring, recurrence_rule_id)
VALUES ('Daily Standup', '2025-08-08 09:00:00+00', true, rule_id);
```

## Recurring Events System

### 3. `recurrence_rules` - The Pattern Definition
**What it does**: Defines HOW something repeats (daily, weekly, every 2nd Tuesday, etc.)

**When to use**:
```javascript
// Every weekday
INSERT INTO recurrence_rules (frequency, by_day) 
VALUES ('DAILY', 'MO,TU,WE,TH,FR');

// Every 2 weeks on Monday and Wednesday
INSERT INTO recurrence_rules (frequency, interval_value, by_day) 
VALUES ('WEEKLY', 2, 'MO,WE');

// Last Friday of every month
INSERT INTO recurrence_rules (frequency, by_day, by_set_pos) 
VALUES ('MONTHLY', 'FR', '-1');
```

### 4. `recurrence_exceptions` - Skip Specific Dates
**What it does**: "Don't show this recurring event on these specific dates"

**When to use**:
```javascript
// Cancel the daily standup on Christmas
INSERT INTO recurrence_exceptions (event_id, exception_date, exception_type)
VALUES (recurring_event_id, '2025-12-25 09:00:00+00', 'deleted');

// Reschedule one instance (you'd create a new event for the new time)
INSERT INTO recurrence_exceptions (event_id, exception_date, exception_type)
VALUES (recurring_event_id, '2025-08-15 09:00:00+00', 'modified');
```

### 5. `recurrence_additions` - Add Extra Dates
**What it does**: "Also show this recurring event on these extra dates"

**When to use**:
```javascript
// Add an extra team meeting on a holiday
INSERT INTO recurrence_additions (event_id, additional_date)
VALUES (weekly_meeting_id, '2025-07-04 10:00:00+00');
```

## People & Notifications

### 6. `event_attendees` - Who's Invited
**What it does**: Manages invitations, RSVPs, and attendee permissions

**When to use**:
```javascript
// Invite someone
INSERT INTO event_attendees (event_id, email, attendee_type)
VALUES (event_id, 'john@company.com', 'required');

// Check responses
SELECT name, response_status FROM event_attendees 
WHERE event_id = event_id AND response_status = 'accepted';

// Update RSVP
UPDATE event_attendees 
SET response_status = 'accepted', response_date = NOW()
WHERE event_id = event_id AND email = 'john@company.com';
```

### 7. `event_reminders` - Notifications
**What it does**: Sends alerts before events (email, SMS, push notifications)

**When to use**:
```javascript
// Email reminder 15 minutes before
INSERT INTO event_reminders (event_id, trigger_minutes, method, email_address)
VALUES (event_id, 15, 'email', 'user@example.com');

// SMS reminder 1 hour before
INSERT INTO event_reminders (event_id, trigger_minutes, method, phone_number)
VALUES (event_id, 60, 'sms', '+1234567890');
```

## Additional Features

### 8. `event_attachments` - Files
**What it does**: Attach documents, images, etc. to events

**When to use**:
```javascript
// Add meeting agenda
INSERT INTO event_attachments (event_id, filename, file_url, mime_type)
VALUES (event_id, 'agenda.pdf', 'https://storage.com/agenda.pdf', 'application/pdf');
```

### 9. `calendar_permissions` - Sharing
**What it does**: Controls who can view/edit which calendars

**When to use**:
```javascript
// Give someone read access to your calendar
INSERT INTO calendar_permissions (calendar_id, user_id, permission_level)
VALUES (calendar_id, other_user_id, 'read');

// Make someone a calendar admin
UPDATE calendar_permissions 
SET permission_level = 'admin' 
WHERE calendar_id = calendar_id AND user_id = user_id;
```

## How They Work Together - Real Examples

### Example 1: Creating a Weekly Team Meeting
```sql
-- 1. Create the recurrence rule
INSERT INTO recurrence_rules (frequency, by_day) 
VALUES ('WEEKLY', 'TU') RETURNING id; -- Returns rule_id

-- 2. Create the recurring event
INSERT INTO events (title, start_datetime, end_datetime, is_recurring, recurrence_rule_id)
VALUES ('Team Standup', '2025-08-12 10:00:00+00', '2025-08-12 10:30:00+00', true, rule_id)
RETURNING id; -- Returns event_id

-- 3. Add attendees
INSERT INTO event_attendees (event_id, email, attendee_type)
VALUES 
  (event_id, 'alice@company.com', 'required'),
  (event_id, 'bob@company.com', 'required');

-- 4. Set up reminders
INSERT INTO event_reminders (event_id, trigger_minutes, method, email_address)
VALUES (event_id, 15, 'email', 'alice@company.com');
```

### Example 2: Handling "This Meeting is Moved This Week Only"
```sql
-- 1. Add exception for the normal time
INSERT INTO recurrence_exceptions (event_id, exception_date, exception_type)
VALUES (weekly_meeting_id, '2025-08-19 10:00:00+00', 'modified');

-- 2. Create new one-time event for the new time
INSERT INTO events (title, start_datetime, end_datetime, calendar_id, parent_event_id)
VALUES ('Team Standup (Moved)', '2025-08-19 14:00:00+00', '2025-08-19 14:30:00+00', 
        calendar_id, weekly_meeting_id);
```

### Example 3: Getting All Events for a Date Range
```sql
-- This is complex because you need to expand recurring events
-- Your application would typically do this logic:

-- 1. Get simple events
SELECT * FROM events 
WHERE calendar_id = calendar_id 
  AND start_datetime BETWEEN '2025-08-01' AND '2025-08-31'
  AND is_recurring = false;

-- 2. Get recurring events and expand them (application logic)
-- 3. Apply exceptions and additions
-- 4. Combine results
```

## Application Architecture Tips

1. **Event Expansion**: Your app needs logic to expand recurring events into individual occurrences
2. **Caching**: Cache expanded recurring events for performance
3. **Background Jobs**: Process reminders with scheduled tasks
4. **Timezone Handling**: Always store in UTC, display in user's timezone
5. **Conflict Detection**: Check for overlapping events when scheduling
6. **Sync Integration**: Use `external_id` and `etag` for Google Calendar, Outlook sync

The key insight is that this schema separates the "pattern" (recurrence rules) from the "instances" (individual events), making it flexible enough to handle complex real-world scheduling scenarios!