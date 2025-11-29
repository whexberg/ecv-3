<?php
/**
 * Plugin Name: Calendar Events
 * Plugin URI: https://example.com
 * Description: Custom post type for calendar events with recurring event support and REST API integration
 * Version: 1.0.0
 * Author: Your Name
 * License: GPL v2 or later
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class Calendar_Events_Plugin {
    
    public function __construct() {
        add_action('init', array($this, 'register_post_type'));
        add_action('init', array($this, 'register_meta_fields'));
        add_action('add_meta_boxes', array($this, 'add_meta_boxes'));
        add_action('save_post_calendar_event', array($this, 'save_event_meta'), 10, 2);
        add_action('rest_api_init', array($this, 'register_rest_fields'));
        add_filter('rest_calendar_event_query', array($this, 'filter_rest_query'), 10, 2);
    }
    
    /**
     * Register the Calendar Event post type
     */
    public function register_post_type() {
        $labels = array(
            'name' => 'Calendar Events',
            'singular_name' => 'Calendar Event',
            'menu_name' => 'Calendar Events',
            'add_new' => 'Add New Event',
            'add_new_item' => 'Add New Calendar Event',
            'edit_item' => 'Edit Calendar Event',
            'new_item' => 'New Calendar Event',
            'view_item' => 'View Calendar Event',
            'search_items' => 'Search Calendar Events',
            'not_found' => 'No calendar events found',
            'not_found_in_trash' => 'No calendar events found in trash'
        );
        
        $args = array(
            'labels' => $labels,
            'public' => true,
            'has_archive' => true,
            'publicly_queryable' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_rest' => true,
            'rest_base' => 'calendar-events',
            'menu_icon' => 'dashicons-calendar-alt',
            'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
            'rewrite' => array('slug' => 'events'),
            'capability_type' => 'post',
        );
        
        register_post_type('calendar_event', $args);
    }
    
    /**
     * Register meta fields for REST API
     */
    public function register_meta_fields() {
        // Event start date/time
        register_post_meta('calendar_event', 'event_start_date', array(
            'type' => 'string',
            'single' => true,
            'show_in_rest' => true,
            'sanitize_callback' => 'sanitize_text_field',
        ));
        
        // Event end date/time
        register_post_meta('calendar_event', 'event_end_date', array(
            'type' => 'string',
            'single' => true,
            'show_in_rest' => true,
            'sanitize_callback' => 'sanitize_text_field',
        ));
        
        // Recurring event flag
        register_post_meta('calendar_event', 'is_recurring', array(
            'type' => 'boolean',
            'single' => true,
            'show_in_rest' => true,
            'sanitize_callback' => 'rest_sanitize_boolean',
        ));
        
        // Recurrence pattern
        register_post_meta('calendar_event', 'recurrence_pattern', array(
            'type' => 'string',
            'single' => true,
            'show_in_rest' => true,
            'sanitize_callback' => 'sanitize_text_field',
        ));
        
        // Recurrence interval
        register_post_meta('calendar_event', 'recurrence_interval', array(
            'type' => 'integer',
            'single' => true,
            'show_in_rest' => true,
            'sanitize_callback' => 'absint',
        ));
        
        // Recurrence end date
        register_post_meta('calendar_event', 'recurrence_end_date', array(
            'type' => 'string',
            'single' => true,
            'show_in_rest' => true,
            'sanitize_callback' => 'sanitize_text_field',
        ));
        
        // Event location
        register_post_meta('calendar_event', 'event_location', array(
            'type' => 'string',
            'single' => true,
            'show_in_rest' => true,
            'sanitize_callback' => 'sanitize_text_field',
        ));
    }
    
    /**
     * Add meta boxes for event details
     */
    public function add_meta_boxes() {
        add_meta_box(
            'calendar_event_details',
            'Event Details',
            array($this, 'render_event_meta_box'),
            'calendar_event',
            'normal',
            'high'
        );
    }
    
    /**
     * Render the event meta box
     */
    public function render_event_meta_box($post) {
        wp_nonce_field('calendar_event_meta_box', 'calendar_event_meta_box_nonce');
        
        $start_date = get_post_meta($post->ID, 'event_start_date', true);
        $end_date = get_post_meta($post->ID, 'event_end_date', true);
        $is_recurring = get_post_meta($post->ID, 'is_recurring', true);
        $recurrence_pattern = get_post_meta($post->ID, 'recurrence_pattern', true);
        $recurrence_interval = get_post_meta($post->ID, 'recurrence_interval', true) ?: 1;
        $recurrence_end_date = get_post_meta($post->ID, 'recurrence_end_date', true);
        $location = get_post_meta($post->ID, 'event_location', true);
        ?>
        <style>
            .event-field { margin-bottom: 15px; }
            .event-field label { display: block; font-weight: bold; margin-bottom: 5px; }
            .event-field input[type="text"],
            .event-field input[type="datetime-local"],
            .event-field select { width: 100%; max-width: 400px; }
            .recurring-options { margin-left: 20px; margin-top: 10px; padding: 15px; background: #f5f5f5; border-radius: 4px; }
        </style>
        
        <div class="event-field">
            <label for="event_start_date">Start Date & Time:</label>
            <input type="datetime-local" id="event_start_date" name="event_start_date" 
                   value="<?php echo esc_attr($start_date); ?>" required>
        </div>
        
        <div class="event-field">
            <label for="event_end_date">End Date & Time:</label>
            <input type="datetime-local" id="event_end_date" name="event_end_date" 
                   value="<?php echo esc_attr($end_date); ?>" required>
        </div>
        
        <div class="event-field">
            <label for="event_location">Location:</label>
            <input type="text" id="event_location" name="event_location" 
                   value="<?php echo esc_attr($location); ?>" placeholder="Event location">
        </div>
        
        <div class="event-field">
            <label>
                <input type="checkbox" id="is_recurring" name="is_recurring" value="1" 
                       <?php checked($is_recurring, 1); ?>>
                This is a recurring event
            </label>
            
            <div class="recurring-options" id="recurring-options" style="<?php echo $is_recurring ? '' : 'display:none;'; ?>">
                <div class="event-field">
                    <label for="recurrence_pattern">Recurrence Pattern:</label>
                    <select id="recurrence_pattern" name="recurrence_pattern">
                        <option value="daily" <?php selected($recurrence_pattern, 'daily'); ?>>Daily</option>
                        <option value="weekly" <?php selected($recurrence_pattern, 'weekly'); ?>>Weekly</option>
                        <option value="monthly" <?php selected($recurrence_pattern, 'monthly'); ?>>Monthly</option>
                        <option value="yearly" <?php selected($recurrence_pattern, 'yearly'); ?>>Yearly</option>
                    </select>
                </div>
                
                <div class="event-field">
                    <label for="recurrence_interval">Repeat Every:</label>
                    <input type="number" id="recurrence_interval" name="recurrence_interval" 
                           value="<?php echo esc_attr($recurrence_interval); ?>" min="1" style="width: 100px;">
                    <span id="interval-label">day(s)</span>
                </div>
                
                <div class="event-field">
                    <label for="recurrence_end_date">Recurrence End Date:</label>
                    <input type="date" id="recurrence_end_date" name="recurrence_end_date" 
                           value="<?php echo esc_attr($recurrence_end_date); ?>">
                </div>
            </div>
        </div>
        
        <script>
            document.getElementById('is_recurring').addEventListener('change', function() {
                document.getElementById('recurring-options').style.display = this.checked ? 'block' : 'none';
            });
            
            document.getElementById('recurrence_pattern').addEventListener('change', function() {
                const labels = {
                    'daily': 'day(s)',
                    'weekly': 'week(s)',
                    'monthly': 'month(s)',
                    'yearly': 'year(s)'
                };
                document.getElementById('interval-label').textContent = labels[this.value];
            });
        </script>
        <?php
    }
    
    /**
     * Save event meta data
     */
    public function save_event_meta($post_id, $post) {
        if (!isset($_POST['calendar_event_meta_box_nonce']) || 
            !wp_verify_nonce($_POST['calendar_event_meta_box_nonce'], 'calendar_event_meta_box')) {
            return;
        }
        
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
        
        // Save event fields
        if (isset($_POST['event_start_date'])) {
            update_post_meta($post_id, 'event_start_date', sanitize_text_field($_POST['event_start_date']));
        }
        
        if (isset($_POST['event_end_date'])) {
            update_post_meta($post_id, 'event_end_date', sanitize_text_field($_POST['event_end_date']));
        }
        
        if (isset($_POST['event_location'])) {
            update_post_meta($post_id, 'event_location', sanitize_text_field($_POST['event_location']));
        }
        
        // Save recurring event fields
        $is_recurring = isset($_POST['is_recurring']) ? 1 : 0;
        update_post_meta($post_id, 'is_recurring', $is_recurring);
        
        if ($is_recurring) {
            if (isset($_POST['recurrence_pattern'])) {
                update_post_meta($post_id, 'recurrence_pattern', sanitize_text_field($_POST['recurrence_pattern']));
            }
            
            if (isset($_POST['recurrence_interval'])) {
                update_post_meta($post_id, 'recurrence_interval', absint($_POST['recurrence_interval']));
            }
            
            if (isset($_POST['recurrence_end_date'])) {
                update_post_meta($post_id, 'recurrence_end_date', sanitize_text_field($_POST['recurrence_end_date']));
            }
        } else {
            // Clear recurring fields if not recurring
            delete_post_meta($post_id, 'recurrence_pattern');
            delete_post_meta($post_id, 'recurrence_interval');
            delete_post_meta($post_id, 'recurrence_end_date');
        }
    }
    
    /**
     * Register custom REST API fields
     */
    public function register_rest_fields() {
        // Add expanded occurrences for recurring events
        register_rest_field('calendar_event', 'occurrences', array(
            'get_callback' => array($this, 'get_event_occurrences'),
            'schema' => array(
                'description' => 'Expanded occurrences for recurring events',
                'type' => 'array',
            ),
        ));
    }
    
    /**
     * Get all occurrences of an event (for recurring events)
     */
    public function get_event_occurrences($object) {
        $is_recurring = get_post_meta($object['id'], 'is_recurring', true);
        
        if (!$is_recurring) {
            return null;
        }
        
        $start_date = get_post_meta($object['id'], 'event_start_date', true);
        $end_date = get_post_meta($object['id'], 'event_end_date', true);
        $pattern = get_post_meta($object['id'], 'recurrence_pattern', true);
        $interval = get_post_meta($object['id'], 'recurrence_interval', true) ?: 1;
        $recurrence_end = get_post_meta($object['id'], 'recurrence_end_date', true);
        
        if (!$start_date || !$pattern) {
            return null;
        }
        
        return $this->calculate_occurrences($start_date, $end_date, $pattern, $interval, $recurrence_end);
    }
    
    /**
     * Calculate recurring event occurrences
     */
    private function calculate_occurrences($start_date, $end_date, $pattern, $interval, $recurrence_end, $limit = 100) {
        $occurrences = array();
        
        $start = new DateTime($start_date);
        $end = new DateTime($end_date);
        $duration = $start->diff($end);
        
        $recurrence_limit = $recurrence_end ? new DateTime($recurrence_end) : null;
        $current = clone $start;
        
        $count = 0;
        while ($count < $limit) {
            if ($recurrence_limit && $current > $recurrence_limit) {
                break;
            }
            
            $occurrence_end = clone $current;
            $occurrence_end->add($duration);
            
            $occurrences[] = array(
                'start' => $current->format('Y-m-d\TH:i:s'),
                'end' => $occurrence_end->format('Y-m-d\TH:i:s'),
            );
            
            // Calculate next occurrence
            switch ($pattern) {
                case 'daily':
                    $current->modify("+{$interval} days");
                    break;
                case 'weekly':
                    $current->modify("+{$interval} weeks");
                    break;
                case 'monthly':
                    $current->modify("+{$interval} months");
                    break;
                case 'yearly':
                    $current->modify("+{$interval} years");
                    break;
            }
            
            $count++;
        }
        
        return $occurrences;
    }
    
    /**
     * Filter REST API queries to support date range filtering
     */
    public function filter_rest_query($args, $request) {
        $start_date = $request->get_param('start_date');
        $end_date = $request->get_param('end_date');
        
        if ($start_date || $end_date) {
            $meta_query = isset($args['meta_query']) ? $args['meta_query'] : array();
            $meta_query['relation'] = 'AND';
            
            if ($start_date) {
                $meta_query[] = array(
                    'key' => 'event_start_date',
                    'value' => $start_date,
                    'compare' => '>=',
                    'type' => 'DATETIME',
                );
            }
            
            if ($end_date) {
                $meta_query[] = array(
                    'key' => 'event_end_date',
                    'value' => $end_date,
                    'compare' => '<=',
                    'type' => 'DATETIME',
                );
            }
            
            $args['meta_query'] = $meta_query;
        }
        
        return $args;
    }
}

// Initialize the plugin
new Calendar_Events_Plugin();