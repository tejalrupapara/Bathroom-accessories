# NEXXORA Premium Accessories API Documentation

Welcome to the REST API Reference for **NEXXORA** (by Greenvolt Enterprise). 

This API operates using standard HTTP request verbs, returns data formatted as JSON objects, and handles state-specific statuses via standard HTTP status codes.

---

## 1. General Setup & Base URLs

- **Development Base URL:** `http://localhost:5000/api`
- **Production Base URL:** `https://your-api-domain.com/api`
- **Content-Type Header:** `application/json`

### Authentication Header
Administrative operations are locked. To access administrative routes, you must perform an Admin Login, retrieve a JWT bearer token, and add it to the request header:
```http
Authorization: Bearer <JWT_SECRET_TOKEN>
```

---

## 2. Public Catalog API

### A. Fetch All Products
Retrieves lists of accessories with comprehensive filtering, searching, sorting, and pagination.

- **Endpoint:** `GET /products`
- **Access:** Public
- **Query Parameters:**
  - `category`: Filters items by series category (e.g. `Sky`, `Prism`, `Lume`, `Vector`, `Nova`, `Neo`, `Prime`). Wildcard `'All'` retrieves everything.
  - `series`: Filters by matching series name.
  - `search`: Case-insensitive regex matches product `name`, `description`, or product code `id`.
  - `sort`: Defines display order. Supported values:
    - `newest` (Default): Sets reverse chronological order.
    - `price_asc`: Sorts by price ascending.
    - `price_desc`: Sorts by price descending.
    - `name_asc`: Sorts alphabetically A-Z.
    - `name_desc`: Sorts alphabetically Z-A.
  - `page`: Page index (Default: `1`).
  - `limit`: Products count per page (Default: `12`).

- **Example Response:**
```json
{
  "success": true,
  "count": 4,
  "totalPages": 1,
  "currentPage": 1,
  "totalProducts": 4,
  "products": [
    {
      "_id": "60c72b2f9b1d8b2345678910",
      "id": "SAA-15",
      "name": "Towel Rack Rod",
      "category": "Sky",
      "series": "Sky Series",
      "badge": "new",
      "description": "Heavy-duty wall mounted towels rack with an integrated support rod, crafted in precision dark acrylic.",
      "image": "/products/SAA-15.jpg",
      "price": 2715,
      "finishes": ["Chrome", "Black Matte", "Rose Gold"],
      "acrylicVariants": ["Dark Acrylic"],
      "createdAt": "2026-05-31T12:00:00.000Z"
    }
  ]
}
```

### B. Fetch Product by ID
Retrieves details for a single product accessory. Supports querying by **MongoDB ObjectID** or **Custom Product Code** (e.g. `SAA-15`).

- **Endpoint:** `GET /products/:id`
- **Access:** Public
- **Example Response:**
```json
{
  "success": true,
  "product": {
    "_id": "60c72b2f9b1d8b2345678910",
    "id": "SAA-15",
    "name": "Towel Rack Rod",
    "category": "Sky",
    "series": "Sky Series",
    "badge": "new",
    "description": "Heavy-duty wall mounted towels rack...",
    "image": "/products/SAA-15.jpg",
    "price": 2715,
    "finishes": ["Chrome", "Black Matte", "Rose Gold"],
    "acrylicVariants": ["Dark Acrylic"],
    "createdAt": "2026-05-31T12:00:00.000Z"
  }
}
```

---

## 3. Public Interactive Submissions

### A. Submit Quote Request
Records accessories quotes and dispatches a detailed SMTP HTML notification to greenvolt28@gmail.com.

- **Endpoint:** `POST /quotes`
- **Access:** Public (Validated)
- **Request Body:**
```json
{
  "name": "Amit Sharma",
  "phone": "+91 98765 43210",
  "email": "amit.sharma@example.com",
  "company": "Sharma Enterprises",
  "message": "Interested in premium Sky and Prism Series fitting quotes for our hotel suites.",
  "selectedProducts": [
    {
      "id": "SAA-15",
      "name": "Towel Rack Rod",
      "category": "Sky",
      "series": "Sky Series",
      "price": 2715
    },
    {
      "id": "PSAA-12",
      "name": "Self with Tumbler Holder & Dispenser",
      "category": "Prism",
      "series": "Prism Series",
      "price": 1440
    }
  ]
}
```
- **Example Response:**
```json
{
  "success": true,
  "message": "Quote request submitted and recorded successfully.",
  "quote": {
    "_id": "60c72b2f9b1d8b2345678911",
    "name": "Amit Sharma",
    "phone": "+91 98765 43210",
    "email": "amit.sharma@example.com",
    "company": "Sharma Enterprises",
    "message": "Interested...",
    "selectedProducts": [...],
    "contacted": false,
    "createdAt": "2026-05-31T12:05:00.000Z"
  }
}
```

### B. Submit Contact Form
Registers corporate feedback form inquiries and dispatches a styled SMTP HTML email notification.

- **Endpoint:** `POST /contacts`
- **Access:** Public (Validated)
- **Request Body:**
```json
{
  "name": "Rajesh Patel",
  "email": "rajesh@example.com",
  "phone": "+91 99900 88800",
  "subject": "Bulk Deal inquiry for Commercial Project",
  "message": "We need custom size configurations for a high-rise residential project in Ahmedabad."
}
```
- **Example Response:**
```json
{
  "success": true,
  "message": "Your inquiry has been submitted successfully.",
  "inquiry": {
    "_id": "60c72b2f9b1d8b2345678912",
    "name": "Rajesh Patel",
    "email": "rajesh@example.com",
    "phone": "+91 99900 88800",
    "subject": "Bulk Deal...",
    "message": "We need...",
    "resolved": false,
    "createdAt": "2026-05-31T12:06:00.000Z"
  }
}
```

### C. Subscribe to Newsletter
Registers client emails for newsletter mailouts. Duplicates are blocked.

- **Endpoint:** `POST /newsletter/subscribe`
- **Access:** Public (Validated)
- **Request Body:**
```json
{
  "email": "catalogue.fan@example.com"
}
```
- **Example Response:**
```json
{
  "success": true,
  "message": "Thank you for subscribing to our newsletter.",
  "subscriber": {
    "_id": "60c72b2f9b1d8b2345678913",
    "email": "catalogue.fan@example.com",
    "subscribedAt": "2026-05-31T12:07:00.000Z"
  }
}
```

---

## 4. Administrative Security API

### A. Admin Login
Authenticates admin user and returns a 30-day JWT bearer token.

- **Endpoint:** `POST /auth/login`
- **Access:** Public (Validated)
- **Request Body:**
```json
{
  "username": "admin",
  "password": "adminpassword123"
}
```
- **Example Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6...",
  "admin": {
    "id": "60c72b2f9b1d8b2345678900",
    "username": "admin",
    "email": "greenvolt28@gmail.com"
  }
}
```

### B. Change Admin Password
Allows logged-in administrators to update password hashes securely.

- **Endpoint:** `POST /auth/change-password`
- **Access:** Private (Admin Protected)
- **Request Body:**
```json
{
  "currentPassword": "adminpassword123",
  "newPassword": "SecureNexxoraPass543!!"
}
```
- **Example Response:**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

---

## 5. Administrative Catalogue Management

### A. Create Catalog Product
Registers a brand new luxury product in the catalog collection.

- **Endpoint:** `POST /products`
- **Access:** Private (Admin Protected)
- **Request Body:**
```json
{
  "id": "SAA-16",
  "name": "Triple Liquid Soap Dispenser Set",
  "category": "Sky",
  "series": "Sky Series",
  "badge": "new",
  "description": "Tri-combination wall bracket soap pumps unit.",
  "image": "/products/SAA-16.jpg",
  "price": 1850,
  "finishes": ["Black Matte", "Rose Gold"],
  "acrylicVariants": ["Dark Acrylic"]
}
```
- **Example Response:**
```json
{
  "success": true,
  "product": {
    "_id": "60c72b2f9b1d8b2345678950",
    "id": "SAA-16",
    "name": "Triple Liquid Soap Dispenser Set",
    "category": "Sky",
    "series": "Sky Series",
    "badge": "new",
    "price": 1850,
    ...
  }
}
```

### B. Update Catalog Product
Modifies details of an existing catalog product.

- **Endpoint:** `PUT /products/:id` (Accepts MongoDB ObjectID or product code `id` e.g. `SAA-16`)
- **Access:** Private (Admin Protected)
- **Request Body:**
```json
{
  "price": 1950,
  "badge": "hot"
}
```
- **Example Response:**
```json
{
  "success": true,
  "product": {
    "id": "SAA-16",
    "price": 1950,
    "badge": "hot",
    ...
  }
}
```

### C. Remove Product
Deletes a product from the database catalog.

- **Endpoint:** `DELETE /products/:id` (Accepts MongoDB ObjectID or product code `id`)
- **Access:** Private (Admin Protected)
- **Example Response:**
```json
{
  "success": true,
  "message": "Product accessory deleted from catalogue"
}
```

---

## 6. Administrative Dashboard & User Management

### A. Get Dashboard Stats
Queries real-time counters and gathers historical snapshots for dashboard display widgets.

- **Endpoint:** `GET /dashboard/stats`
- **Access:** Private (Admin Protected)
- **Example Response:**
```json
{
  "success": true,
  "stats": {
    "totalProducts": 22,
    "totalQuotes": 8,
    "totalInquiries": 4,
    "totalSubscribers": 18
  },
  "recentActivity": {
    "quotes": [ ... ],
    "inquiries": [ ... ]
  }
}
```

### B. View Quote Requests
Fetch chronologically sorted quotes with pagination.

- **Endpoint:** `GET /quotes?page=1&limit=20`
- **Access:** Private (Admin Protected)

### C. Toggle Contacted Status
Toggles contacted status of a quote from `false` to `true` or vice versa.

- **Endpoint:** `PUT /quotes/:id/contacted`
- **Access:** Private (Admin Protected)

### D. Delete Quote Request
Permanently wipes a quote entry.

- **Endpoint:** `DELETE /quotes/:id`
- **Access:** Private (Admin Protected)

### E. View Contact Inquiries
Retrieves contact messages.

- **Endpoint:** `GET /contacts?page=1&limit=20`
- **Access:** Private (Admin Protected)

### F. Toggle Resolution Status
Toggles resolved status of an inquiry.

- **Endpoint:** `PUT /contacts/:id/resolve`
- **Access:** Private (Admin Protected)

### G. View Newsletter Subscribers
Fetches list of active newsletter emails.

- **Endpoint:** `GET /newsletter/subscribers?page=1&limit=50`
- **Access:** Private (Admin Protected)

### H. Export Subscribers CSV
Compiles and streams a downloadable spreadsheet file (`nexxora_subscribers.csv`) containing complete user email addresses and subscription timestamps.

- **Endpoint:** `GET /newsletter/export`
- **Access:** Private (Admin Protected)
- **Headers Returned:**
  - `Content-Type: text/csv; charset=utf-8`
  - `Content-Disposition: attachment; filename=nexxora_subscribers.csv`
