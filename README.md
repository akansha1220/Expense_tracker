# Expense Tracker

A full-stack Expense Tracker application built with:
- **Backend**: NestJS
- **Frontend**: ReactJS
- **Database**: PostgreSQL (managed with Docker)
### NOTE : Created the 3 different branches for each component

## Folder Structure
- `/backend`: Contains the NestJS backend code.
- `/frontend`: Contains the ReactJS frontend code.
- `/database`: Configuration for PostgreSQL Docker setup.

---

## Setup Instructions

### Prerequisites
1. Install Docker and Docker Compose.
2. Install Node.js (v16 or above recommended).

---

### Step 1: Set Up PostgreSQL and pgAdmin Containers
1. Navigate to the `/database` directory.
2. Run the following command to start the PostgreSQL and pgAdmin containers:
   ```bash
   docker-compose up -d
   ```
3. Verify that PostgreSQL is running on the specified port (default: `5432`) and pgAdmin is accessible.
4. Use pgAdmin to check if the connection to the PostgreSQL database is successful.

---

### Step 2: Configure Backend
1. Navigate to the `/backend` directory.
2. Create a `.env` file by copying the provided `.env.example` file:
   ```bash
   cp .env.example .env
   ```
3. Update the `.env` file with the following information:
   - **Database URL**: Ensure the correct port, username, password, and database name match your PostgreSQL setup.
   - **Application Port**: Default is `3000`. You can customize it.

4. Run database migrations to create the required tables:
   ```bash
   npm run migration:run
   ```
5. Start the backend application:
   ```bash
   npm run start:dev
   ```
   The backend should now be running at `http://localhost:3000`.

---

### Step 3: Configure Frontend
1. Navigate to the `/frontend` directory.
2. Create a `.env` file by copying the provided `.env.example` file:
   ```bash
   cp .env.example .env
   ```
3. Update the `.env` file to specify the backend API URL (e.g., `http://localhost:3000`) and the frontend application port (e.g., `3001`).
4. Install dependencies and start the frontend application:
   ```bash
   npm install
   npm start
   ```
   The frontend should now be running at `http://localhost:3001`.

---

Here’s a step-by-step guide to modify the `main.ts` file in the backend and the `api.js` file in the frontend:

### Backend - Update CORS Configuration

1. Open the file located at `/backend/src/main.ts`.
2. Add or update the `app.enableCors` configuration to include your frontend's URL:
   ```typescript
   app.enableCors({
       origin: 'http://localhost:3001', // Replace with your frontend URL
       methods: 'GET,POST,PUT,DELETE',
       allowedHeaders: 'Content-Type,Authorization',
       credentials: false, // Set to true if credentials like cookies are required
   });
   ```
3. Save the file and restart the backend application:
   ```bash
   npm run start:dev
   ```

### Frontend - Update API Base URL

1. Navigate to `/frontend/src/api.js` (or the location of your API configuration file).
2. Modify the Axios base URL to match your backend's URL:
   ```javascript
   import axios from 'axios';

   const API = axios.create({
       baseURL: 'http://localhost:3000/api/v1', // Replace with your backend URL
   });

   export default API;
   ```
3. Save the file.

### Notes
- Ensure the ports match between the configurations in `.env` files, backend `main.ts`, and frontend `api.js`.
- For production, replace `http://localhost:3000` and `http://localhost:3001` with your actual deployed URLs and use secure HTTPS.

-----

## Application Features

1. **User Registration and Authentication**:
   - Navigate to the signup page to create a new user.
   - Login with valid credentials to access the dashboard.
   - Try logging in with invalid credentials to test error handling.
   - Authentication is managed using JWT.

2. **User Dashboard**:
   - Displays data visualization of all expense categories and their percentage weights.
   - Filter visualization by specific date, month, or custom date range.

3. **Manage Expenses**:
   - Add new expenses through the expense management section.
   - Newly added expenses will be reflected on the dashboard immediately.

4. **User Profile**:
   - View current user details on the dashboard.

---

## Testing
- Test JWT authentication by logging in with both valid and invalid credentials.
- Add expenses and verify updates in real-time on the dashboard.
- Use date filters to visualize expenses for specific periods.

---

## Troubleshooting
1. Ensure Docker containers for PostgreSQL and pgAdmin are running.
2. Verify `.env` configurations for both backend and frontend.
3. Check application logs for any errors:
   - **Backend**: `npm run start:dev`
   - **Frontend**: `npm start`
4. Confirm that database migrations are applied successfully.

---

Enjoy tracking your expenses efficiently!

