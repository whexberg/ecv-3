---
# REQUIRED FIELDS
id: unique-event-identifier # Required: Unique identifier for this event
title: Event Title Here # Required: Display name of the event

# OPTIONAL BASIC INFO
description: Brief description of event # Optional: Short summary (recommended for SEO)
location: Full address or venue name # Optional: Where the event takes place

# DATE & TIME FIELDS
# For one-time events, just set start_datetime and end_datetime
# For recurring events, these serve as the template for all occurrences
start_datetime: '2024-11-25T19:00:00' # Optional: ISO 8601 format (YYYY-MM-DDTHH:MM:SS)
end_datetime: '2024-11-25T21:00:00' # Optional: ISO 8601 format
timezone: America/Los_Angeles # Optional: IANA timezone (default: America/Los_Angeles)

# TBD FLAGS - Use when dates/times aren't finalized
start_date_tbd: false # Optional: true if start date not yet determined
end_date_tbd: false # Optional: true if end date not yet determined
start_time_tbd: false # Optional: true if start time not yet determined
end_time_tbd: false # Optional: true if end time not yet determined
all_day: false # Optional: true for all-day events (ignores times)

# EVENT CLASSIFICATION
event_type: meeting # Optional: meeting, doins, picnic, ceremony, social, fundraiser, historical, other
is_members_only: false # Optional: true if restricted to members
is_published: true # Optional: false to hide from public (draft mode)

# HIERARCHY (for event series or modified occurrences)
parent_event_id: parent-event-slug # Optional: Link to parent event if this is a special occurrence

# RECURRENCE RULE (omit entire section for one-time events)
recurrence:
    label: Every Monday evening # Required if recurrence exists: Human-readable description

    # REQUIRED RECURRENCE FIELDS
    frequency: WEEKLY # Required: YEARLY, MONTHLY, WEEKLY, DAILY, HOURLY, MINUTELY, SECONDLY

    # OPTIONAL RECURRENCE MODIFIERS
    interval:
        1 # Optional: Repeat every N intervals (default: 1)
        # Examples: interval: 2 with WEEKLY = every 2 weeks

    # RECURRENCE END CONDITIONS (choose ONE or NEITHER for infinite)
    count: 10 # Optional: Stop after N occurrences (mutually exclusive with until)
    until: '2025-12-31' # Optional: Stop after this date (mutually exclusive with count)

    # BY-RULES (filters for when recurrence happens)
    by_day:
        [MO, WE, FR] # Optional: Days of week (MO, TU, WE, TH, FR, SA, SU)
        # Can include position: [1MO, -1FR] = 1st Monday, last Friday

    by_month_day:
        [1, 15] # Optional: Days of month (1-31 or -1 to -31)
        # Example: [1, 15] = 1st and 15th of month
        # Example: [-1] = last day of month

    by_month:
        [1, 6, 12] # Optional: Months (1=Jan to 12=Dec)
        # Example: [6, 7, 8] = only in summer months

    by_year_day:
        [1, 100, 365] # Optional: Days of year (1-366 or -366 to -1)
        # Example: [1] = New Year's Day only

    by_week_number:
        [1, 52] # Optional: ISO week numbers (1-53 or -53 to -1)
        # Example: [1] = first week of year

    by_set_position:
        [1, -1] # Optional: Filter to Nth occurrence from by_day/by_month_day
        # Example: by_day: [MO,TU,WE,TH,FR], by_set_position: [1]
        # Result: First weekday of period

    by_hour: [9, 14, 18] # Optional: Hours of day (0-23)
    by_minute: [0, 30] # Optional: Minutes of hour (0-59)
    by_second: [0] # Optional: Seconds of minute (0-59)

    week_start:
        MO # Optional: Week start day (default: MO)
        # Affects WEEKLY freq and by_week_number calculations

# RECURRENCE EXAMPLES:
# Every Monday at 7pm:
#   frequency: WEEKLY, interval: 1, by_day: [MO]
#
# First and third Tuesday of every month:
#   frequency: MONTHLY, by_day: [TU], by_set_position: [1, 3]
#
# Last Friday of every month:
#   frequency: MONTHLY, by_day: [FR], by_set_position: [-1]
#
# Every weekday (Mon-Fri):
#   frequency: WEEKLY, by_day: [MO, TU, WE, TH, FR]
#
# Bi-weekly on Wednesdays:
#   frequency: WEEKLY, interval: 2, by_day: [WE]
#
# Quarterly (every 3 months) on the 15th:
#   frequency: MONTHLY, interval: 3, by_month_day: [15]
#
# Annual event on July 4th:
#   frequency: YEARLY, by_month: [7], by_month_day: [4]
#
# Every other year:
#   frequency: YEARLY, interval: 2

# EXCEPTIONS - Skip specific occurrences (for recurring events)
exceptions:
    - date: '2024-12-25T00:00:00' # Required: Date to skip (ISO 8601)
      reason: Christmas holiday # Optional: Why this occurrence is skipped
    - date: '2025-01-01T00:00:00'
      reason: New Year's Day

# ADDITIONS - Add extra occurrences (for recurring events)
# Use this for special one-time events that don't follow the pattern
additions:
    - date: '2024-11-28T10:00:00' # Required: Extra occurrence date (can have different time!)
      reason: Special Thanksgiving ceremony # Optional: Why this extra occurrence exists

# CONTACTS
contacts:
    - name: John Smith # Required: Contact name
      email: john@example.org # Optional: Email address
      phone: 555-0100 # Optional: Phone number
    - name: Jane Doe
      email: jane@example.org
      # Note: phone is optional

# ATTACHMENTS
attachments:
    - filename: agenda.pdf # Required: Original filename
      file_url: /files/events/meeting/agenda.pdf # Optional: Path or URL to file
      file_type: pdf # Optional: image, pdf, document, other
      description: Meeting agenda # Optional: What this file is
      display_order: 1 # Optional: Sort order (lower = first)
    - filename: photo.jpg
      file_url: https://example.com/photo.jpg
      file_type: image
      description: Last year's event photo
      display_order: 2

# CUSTOM METADATA - Store anything you want!
meta:
    dress_code: formal # Optional: Any custom fields you need
    rsvp_required: true
    rsvp_deadline: '2024-11-20'
    capacity: 50
    registration_url: https://example.com/register
    cost: 25.00
    cost_members: 15.00
    parking_info: Free parking in rear lot
    accessibility: Wheelchair accessible
    # Add any custom fields your app needs!
---

# Event Content (Markdown/MDX)

Everything below the `---` frontmatter is the event body content.
You can use full Markdown or MDX here!

## Description

Write your full event description here with **formatting**.

- Bullet points work
- So do lists

## What to Bring

1. Item one
2. Item two
3. Item three

## Schedule

| Time    | Activity   |
| ------- | ---------- |
| 6:00 PM | Doors open |
| 7:00 PM | Main event |
| 9:00 PM | Close      |

## Special Notes

> Use blockquotes for important info

You can also use custom MDX components if you've defined them:

<Callout type="warning">
This is a callout component!
</Callout>

<Button href="/register">
Register Now
</Button>

---

**Questions?** Contact us at info@example.org
