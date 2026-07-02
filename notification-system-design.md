# Notification System Design

# Stage 1

# Stage 1 - REST API Design


## Common Headers

- Authorization: Bearer <JWT_TOKEN>
- Content-Type: application/json

---

## API 1 – Get All Notifications

**Endpoint**

```http
GET /notifications
```

**Description**

This API returns all notifications available for the logged-in user.
**Sample Response**
```json
{
  "notifications": [
    {
      "id": 1,
      "type": "Event",
      "title": "National Level Hackathon",
      "message": "Registration is open until July 8.",
      "isRead": false
    }
  ]
}
```

---

## API 2 – Get Notification Details

**Endpoint**

```http
GET /notifications/{id}
```

**Description**

This API returns the complete details of a selected notification.

---

## API 3 – Mark Notification as Read

**Endpoint**

```http
PUT /notifications/{id}/read
```

**Description**

Updates the notification status from unread to read.

---

## API 4 – Filter Notifications

**Endpoint**

```http
GET /notifications?type=Placement
```

**Description**

Returns notifications based on the selected category such as Placement, Result, or Event.

-----

# Stage 2 - Database Schema Design

Introduction

↓

Notifications Table

↓

Column Description

↓

Reason for Choosing the Schema



---- 


# Stage 3 - SQL Query Optimization
-

## SQL Query

```sql
SELECT notification_id, title, type, created_at
FROM notifications
WHERE type = 'Placement'
ORDER BY created_at DESC
LIMIT 10;
```

---

## Indexing

To make the query faster, indexes can be created on columns that are used frequently for searching and sorting.

```sql
CREATE INDEX idx_type ON notifications(type);
CREATE INDEX idx_created_at ON notifications(created_at);
```

---

## Why Indexing?

- Makes searching faster.
- Improves filtering based on notification type.
- Helps display the latest notifications quickly.
- Reduces the time taken to execute queries.

---


# Stage 4 - Performance Improvements

## Techniques to Improve Performance

### 1. Pagination

Display notifications in smaller batches instead of loading all notifications at once. This reduces the response time and improves the user experience.

### 2. Caching

Frequently accessed notifications can be stored in cache to reduce repeated database queries and improve response speed.

### 3. Database Indexing

Indexes on columns like `type` and `created_at` help retrieve notifications faster.

### 4. Lazy Loading

Load additional notifications only when the user scrolls or requests more data. This reduces the initial loading time.

### 5. Asynchronous Processing

Background tasks can be used for sending notifications without affecting the application's response time.
___________
# Stage 5 - Reliable Notification Delivery

## Improvements to the Notification System

### 1. Message Queue

Instead of sending all notifications directly, they can be added to a message queue. This helps process notifications one by one without overloading the server.

### 2. Retry Mechanism

If a notification fails to send because of a temporary error, the system should automatically retry sending it after a short delay.

### 3. Database Transactions

Transactions ensure that notifications are stored correctly in the database. If an error occurs during the process, the changes can be rolled back to maintain data consistency.

### 4. Logging

Every successful or failed notification should be logged using the logging middleware. This helps in monitoring and debugging the notification system.

### 5. Error Handling

Proper exception handling should be implemented so that one failed notification does not stop the delivery of other notifications. 
