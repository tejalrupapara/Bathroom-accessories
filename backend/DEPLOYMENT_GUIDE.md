# NEXXORA Accessories Backend - Production Deployment Guide

This guide outlines the steps required to deploy the **NEXXORA Premium Bathroom Accessories** Node.js/Express.js REST API backend to production hosting environments (e.g. Render, Railway, Heroku, or virtual private servers).

---

## 1. Preparing Environment Configuration

Before deploying, ensure you have established production instances for **MongoDB Atlas** and **Nodemailer SMTP**.

Create a new set of environment configurations inside your hosting platform's Dashboard under the **Environment Variables / Config Vars** tab using the following keys:

| Environment Variable | Description | Example / Recommended Value |
| :--- | :--- | :--- |
| `PORT` | Server listen port | `5000` (Most platforms inject this dynamically) |
| `NODE_ENV` | Mode of operation | `production` (Hides detailed error stack traces) |
| `MONGODB_URI` | Atlas MongoDB connection URI | `mongodb+srv://admin:pass@cluster.mongodb.net/nexxora...` |
| `JWT_SECRET` | Secret hash key for admin logins | A long, secure random key string |
| `SMTP_HOST` | Transactional email provider host | `smtp.gmail.com` |
| `SMTP_PORT` | Transactional email provider port | `587` (For TLS) or `465` (For SSL) |
| `SMTP_USER` | Transactional sender email address | `greenvolt28@gmail.com` |
| `SMTP_PASS` | Transactional email password | *Your 16-character Gmail App Password* (See Section 3) |
| `NOTIFICATION_EMAIL` | Target inbox for submissions alerts | `greenvolt28@gmail.com` |

---

## 2. Setting Up MongoDB Atlas Cluster

1. Sign up/log in at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new **Free Shared Tier Cluster** (Cluster0).
3. Under **Database Access**, create a database user (e.g., `nexxora_admin`) and write down a secure password.
4. Under **Network Access**, click **Add IP Address** and select **Allow Access from Anywhere** (`0.0.0.0/0`). *This is required because hosting providers like Render/Railway allocate dynamic IPs unless static proxy arrangements are set up.*
5. Navigate to your Cluster Dashboard, click **Connect** -> **Connect your application** -> **Node.js driver**.
6. Copy the connection string and replace `<username>` and `<password>` with your created database user details. Set this string as the `MONGODB_URI` environment variable.

---

## 3. Configuring Gmail SMTP App Passwords (Nodemailer)

To allow the backend to send automated notifications securely via `greenvolt28@gmail.com` without sharing your main Google account password, you must generate a Google **App Password**:

1. Log in to [Google Account Console](https://myaccount.google.com/).
2. Navigate to the **Security** tab in the left-hand menu.
3. Ensure **2-Step Verification** is enabled on your account.
4. Click on **2-Step Verification** -> scroll to the bottom -> click on **App Passwords**.
5. Under "Select app", choose **Other (Custom name)** and enter `NEXXORA Catalogue Backend`.
6. Click **Generate**. Google will display a **16-character passcode** inside a yellow box (e.g., `abcd efgh ijkl mnop`).
7. Copy this 16-character passcode (without spaces) and assign it to the `SMTP_PASS` environment variable inside your production dashboard config.

---

## 4. Deploying to Production Platforms

### A. Deploying to Render (Recommended Free/Hobby Tier)
1. Sign up or log in at [Render](https://render.com/).
2. On the dashboard, click **New** -> **Web Service**.
3. Connect your GitHub repository containing the backend code.
4. Set the following settings:
   - **Name:** `nexxora-backend`
   - **Environment:** `Node`
   - **Region:** Choose a location closest to your audience (e.g., Oregon or Singapore).
   - **Branch:** `main` (or whichever branch you push to).
   - **Root Directory:** `backend` (If the backend folder is a subdirectory under the root workspace).
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click **Advanced** -> **Add Environment Variable** and enter the keys listed in Section 1.
6. Click **Create Web Service**. Render will build and launch your container. Once completed, your public URL will look like `https://nexxora-backend.onrender.com`.

### B. Deploying to Railway
1. Sign up or log in at [Railway](https://railway.app/).
2. Click **New Project** -> **Deploy from GitHub repo**.
3. Choose your repository.
4. If your project is a monorepo or has the backend in a sub-folder, navigate to **Settings** -> **Root Directory** and specify `backend`.
5. Under the **Variables** tab, bulk-paste the environment variables listed in Section 1.
6. Railway will automatically detect `package.json` scripts, build, and deploy. Click **Generate Domain** under the **Settings** tab to generate a public API URL.

---

## 5. Running Seeding Scripts in Production

To prepopulate your production MongoDB Atlas instance with luxury Sky, Prism, Lume, Vector, Nova, Neo, and Prime products:

- **Local Seeding (Remote Target):**
  Temporarily replace the `MONGODB_URI` in your local `.env` file with your production **MongoDB Atlas Connection String**, and execute in your local shell terminal:
  ```bash
  npm run seed
  ```
  Once the script prints "Database Seeding Completed Successfully!", restore your local connection parameters inside `.env`.

- **Platform Console Seeding:**
  If your platform allows terminal execution (like Railway or VPS SSH), navigate to the project directory and run:
  ```bash
  npm run seed
  ```

---

## 6. Verification and Maintenance

- **Health Endpoint:** Visit `https://your-domain.com/api/health` to confirm the container is responsive.
- **Log Monitoring:** Keep an eye on platform log pages to check Mongoose connection successes or Nodemailer SMTP status errors during test entries.
