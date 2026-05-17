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

> Authorization endpoints

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
   - Expected: 201 with access token, refresh token, and user object.

2. send POST request on http://127.0.0.1:8000/api/auth/login/ along with the following JSON object in the Body -> raw -> JSON
   - Request body:
     ```json
     {
       "username": "testuser",
       "password": "testpassword123"
     }
     ```
   - Expected: 200 with access token, refresh token, and user object. Copy the access token.

3. send POST request on http://127.0.0.1:8000/api/auth/token/refresh/ along with the following JSON object in the Body -> raw -> JSON
   - Request body:
     ```json
     {
       "refresh": "your_refresh_token_here"
     }
     ```
   - Expected: 205 Reset Content with success message. Copy the new access token.

> Profile endpoints

4. send GET request on http://127.0.0.1:8000/api/auth/users/me/ with the access token in the headers tab of Postman in the following way:
   > Authorization: Bearer <your_access_token_here>
   - Expected: 200 with your user and profile data.

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
    - Expected: 200 with updated profile.

---

### Frontend endpoints (Test by running the nextjs app)