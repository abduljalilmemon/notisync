# 📣 Notisync

**Notisync** is a scalable, multi-tenant notification system built with Django Rest Framework. It allows applications to send and manage notifications via Email, SMS, Webhooks, and In-App messaging, all through a single unified API.

Built for modern SaaS applications, Notisync enables dynamic templating, per-user preferences, asynchronous delivery, and retry mechanisms – making it ideal for high-volume, real-time alert systems.

---

## ✅ Features Implemented So Far

- 🔐 **Token-Based Authentication** using DRF’s `TokenAuthentication`
- 👥 **Multi-Tenant User & Organization Structure** with proper org-user linkage
- 📨 **Notification Template System**
  - Supports dynamic variables via `{{ }}` in message body
  - Linked to specific organizations
- 📬 **Notify API Endpoint (`/api/notify/`)**
  - Accepts a `template_key`, `user_id`, and dynamic `params`
  - Resolves the correct template for the user's organization
  - Renders and validates the final message
- 🧪 **API Successfully Tested** using Python’s `requests` library
- 🚫 Graceful error handling with proper HTTP status codes (e.g., 404 if template not found)

---

## 🛠️ Next Up

- ⚙️ Integrate **Celery** for async background processing
- 🔁 Implement **Redis** as Celery broker
- 📡 Add actual **channel delivery logic** (Email, SMS, Webhook)
- 🎛️ User-specific **notification preferences**
- 📊 Delivery tracking & retry queue

---

## 🔗 How to Contribute

Pull requests are welcome! If you're interested in contributing or testing, feel free to open an issue or fork the project.

---