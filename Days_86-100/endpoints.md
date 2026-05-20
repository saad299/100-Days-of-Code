POST  /api/auth/register/
POST  /api/auth/login/
GET   /api/auth/users/me/       (with token)
POST  /api/projects/             (with token)
GET   /api/projects/
GET   /api/projects/<id>/
GET   /api/projects/mine/        (with token)
POST  /api/projects/<id>/requests/  (second user token)
GET   /api/projects/<id>/requests/  (owner token)
PATCH /api/projects/<id>/requests/<req_id>/  (owner token)
GET   /api/requests/mine/        (second user token)

## Testing API endpoints

### Backend endpoints (Test on Postman)

> Authorization(Profile) endpoints

1. send POST request on http://127.0.0.1:8000/api/auth/register/ along with the following JSON object in the Body -> raw -> JSON
   - Request body:
     ```json
     {
       "username": "testuser",
       "email": "testuser@example.com",
       "password": "testpassword123",
       "password2": "testpass123"
     }
     ```
   - Expected output: 201 status with access token, refresh token, and user object.

2. send POST request on http://127.0.0.1:8000/api/auth/login/ along with the following JSON object in the Body -> raw -> JSON
   - Request body:
     ```json
     {
       "username": "testuser",
       "password": "testpassword123"
     }
     ```
   - Expected output: 200 status with access token, refresh token, and user object. Copy the access token.

3. send POST request on http://127.0.0.1:8000/api/auth/token/refresh/ along with the following JSON object in the Body -> raw -> JSON
   - Request body:
     ```json
     {
       "refresh": "your_refresh_token_here"
     }
     ```
   - Expected output: 205 Reset Content status with success message. Copy the new access token.

> Profile endpoints

4. send GET request on http://127.0.0.1:8000/api/auth/users/me/ with the access token in the headers tab of Postman in the following way:
   > Authorization: Bearer <your_access_token_here>
   - Expected output: 200 status with your user and profile data.

5. send PATCH request on http://127.0.0.1:8000/api/auth/users/me/ with the access token in the headers tab of Postman in the following way:
    > Authorization: Bearer <your_access_token_here>
and with the following JSON object in the Body -> raw -> JSON:
    ```json
    {
       "bio": "Django and Next.js developer",
       "skills": "Python, Django, JavaScript, Next.js",
       "github_url": "https://github.com/yourusername",
       "location": "Karachi, Pakistan"
    }
    ```
    - Expected output: 200 status with updated profile.

6. send GET request on http://127.0.0.1:8000/api/auth/users/testuser/ without any access token to get the public profile
  - Expected output: 200 status with public profile

> Project endpoints

1. send GET request on http://127.0.0.1:8000/api/projects/ without any access token to get the list of listed projects
  - Expected output: 200 status with list of posted projects

2. send GET request on http://127.0.0.1:8000/api/projects/{id}/ without any access token to get the project details
  - Expected output: 200 status with project details of that specific project

3. send GET request on http://127.0.0.1:8000/api/projects/mine/ with the access token to get the project details of your listed projects
  - Expected output: 200 status with only your listed projects

4. send GET request on http://127.0.0.1:8000/api/projects/?search=test without any access token to search for projects containing that specific keyword
  - Expected output: 200 status with only projects containing that specific keyword

5. send PATCH request on http://127.0.0.1:8000/api/projects/{id}/ with the access token in the headers tab of Postman in the following way:
    > Authorization: Bearer <your_access_token_here>
and with the following JSON object in the Body -> raw -> JSON:
    ```json
    {
       "title": "Updated Title",
       "description": "Updated Description",
       "technologies": "Updated Technologies",
       "github_url": "https://github.com/yourusername/updated-project",
       "live_url": "https://yourusername.github.io/updated-project",
       "is_listed": true
    }
    ```
    - Expected output: 200 status with updated project.

6. send POST request on http://127.0.0.1:8000/api/projects/ with the access token in the headers tab of Postman in the following way:
    > Authorization: Bearer <your_access_token_here>
and with the following JSON object in the Body -> raw -> JSON:
    ```json
    {
       "title": "New Project",
       "description": "New Project Description",
       "technologies": "New Project Technologies",
       "github_url": "https://github.com/yourusername/new-project",
       "live_url": "https://yourusername.github.io/new-project",
       "is_listed": true
    }
    ```
    - Expected output: 201 status with created project.

---

### Frontend endpoints (Test by running the nextjs app)