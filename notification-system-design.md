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

