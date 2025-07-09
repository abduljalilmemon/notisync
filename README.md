# 📣 Notisync

**Notisync** is a scalable, multi-tenant notification system built with Django Rest Framework. It allows applications to send and manage notifications via Email, SMS, Webhooks, and In-App messaging — all through a single unified API.

Ideal for modern SaaS applications, Notisync supports dynamic templating, user preferences, async delivery, and retry mechanisms.

---

## ✅ Features

- 🔌 Unified API for multi-channel notifications
- ✉️ Email, SMS, Webhook delivery channels (plug & play support)
- 🧩 Dynamic Jinja2-based templating
- 🔁 Asynchronous background task handling via **Celery**
- ⚙️ Redis integration as a **Celery broker**
- 🧑‍💼 User-specific notification preferences
- 🚦 Delivery status tracking & retry queue
- 🧪 Easy-to-test, extendable architecture
- 🌐 Multi-tenant org-based data handling

---

## 📦 Technologies Used

- **Backend:** Django, Django REST Framework
- **Task Queue:** Celery
- **Message Broker:** Redis
- **Templating:** Jinja2
- **Database:** SQLite (default, can be changed)
- **Frontend (upcoming):** React + Vite

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

Make sure Redis is running on `localhost:6379`. You can install it via:

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

## 📂 Project Structure

```
notisync/
├── notisync/              # Django project settings
├── notifications/         # Core notification logic
├── users/                 # User and org models
├── test.py                # Sample script for testing
├── db.sqlite3             # Default DB
├── README.md
├── manage.py
└── venv/                  # Virtual environment
```

---

## 🧪 Test Notification

You can test a notification by calling the API or running `test.py` which triggers a Celery task using a defined notification template.

---

## 🖼️ Frontend (Coming Soon)

We're planning to build a lightweight React frontend using **Vite** for:

- Managing templates
- Viewing delivery logs
- Admin dashboards
- User preferences

---

## 🧠 Contributing

Contributions are welcome! Clone the repo, make changes, and open a pull request.
