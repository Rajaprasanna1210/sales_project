# sales_project
interview assessment

Tech Stack

- **Node.js**
- **Express.js**
- **MySQL (via mysql2/promise)**
- **CSV Parser**
- **Postman** (for testing)

---

## 📂 Project Structure

```bash
.
├── config/
│   └── db.js               # DB connection and table creation
├── controllers/
│   └── sales_controller.js # API logic
├── routes/
│   └── sales_routes.js     # Routes definitions
├── service/
│   └── sales_service.js    # CSV loader and analysis services
├── server.js               # App entry point
├── uploads/                # CSV upload directory
├── README.md
├── salesdb_er_diagram.png  # DB schema diagram
```

---
 Installation

```bash
git clone https://github.com/Rajaprasanna1210/sales_project.git
npm install
```

### 🧪 Configure MySQL

Ensure your MySQL server is running, then update the credentials in `config/db.js` if needed:

```js
user: 'root',
password: 'your_password',
```

### ▶️ Run the Server

```bash
node server.js
```
