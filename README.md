
# 📣 Notisync

**Notisync** is a scalable, multi-tenant notification system built with Django Rest Framework + React. It allows applications to send and manage notifications via Email, SMS, Webhooks, and In-App messaging — all through a single unified API and frontend.

Ideal for modern SaaS applications, Notisync supports dynamic templating, user preferences, async delivery, JWT authentication, and retry mechanisms.

---

## ✅ Features

- 🔐 JWT-based authentication with access & refresh tokens
- 🔌 Unified API for multi-channel notifications
- ✉️ Email, SMS, Webhook delivery channels (plug & play support)
- 🧩 Dynamic Jinja2-based templating
- 🔁 Async background task handling via **Celery**
- ⚙️ Redis integration as a **Celery broker**
- 🧑‍💼 User-specific notification preferences
- 🚦 Delivery status tracking & retry queue
- 🧪 Easy-to-test, extendable architecture
- 🌐 Multi-tenant org-based data handling
- 💻 Frontend with login + notification list (React + Vite)

---

## 📦 Technologies Used

- **Backend:** Django, Django REST Framework, SimpleJWT
- **Task Queue:** Celery
- **Message Broker:** Redis
- **Templating:** Jinja2
- **Frontend:** React + Vite + TailwindCSS
- **Database:** SQLite (default, can be swapped)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/notisync.git
cd notisync
```

### 2. Create Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate    # On Windows
# source venv/bin/activate  # On macOS/Linux
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run Redis (required for Celery)

Make sure Redis is running on `localhost:6379`. Install it via:

- Windows: https://github.com/tporadowski/redis
- Mac (brew): `brew install redis`
- Linux: `sudo apt install redis`

Then start the Redis server.

---

### 5. Run Migrations

```bash
python manage.py migrate
```

### 6. Create Superuser (optional)

```bash
python manage.py createsuperuser
```

---

### 7. Start Django Server

```bash
python manage.py runserver
```

### 8. Start Celery Worker

```bash
celery -A notisync worker --loglevel=info
```

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`

### 🔐 Login
Login via `/api/login/` using a valid username/password.
Stores access & refresh tokens in localStorage.

### 🔄 Token Refresh
The frontend automatically refreshes the access token when it expires using the stored refresh token.

### 🔔 Notifications
After login, the user sees all of their notifications in a modern UI grouped by status (e.g. Sent, Queued).

---

## 📂 Project Structure

```
notisync/
├── notisync/              # Django project settings
├── notifications/         # Core notification logic
├── users/                 # Auth & user models
├── frontend/              # React + Vite frontend
├── test.py                # Sample Celery test script
├── db.sqlite3             # Default DB
├── README.md
├── manage.py
└── venv/                  # Python virtual environment
```

---