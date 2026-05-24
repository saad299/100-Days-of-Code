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

### Registering
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

### Logging in
2. send POST request on http://127.0.0.1:8000/api/auth/login/ along with the following JSON object in the Body -> raw -> JSON
   - Request body:
     ```json
     {
       "username": "testuser",
       "password": "testpassword123"
     }
     ```
   - Expected output: 200 status with access token, refresh token, and user object. Copy the access token.

### Refreshing token
3. send POST request on http://127.0.0.1:8000/api/auth/token/refresh/ along with the following JSON object in the Body -> raw -> JSON
   - Request body:
     ```json
     {
       "refresh": "your_refresh_token_here"
     }
     ```
   - Expected output: 205 Reset Content status with success message. Copy the new access token.

> Profile endpoints

### Getting profile
4. send GET request on http://127.0.0.1:8000/api/auth/users/me/ with the access token in the headers tab of Postman in the following way:
   > Authorization: Bearer <your_access_token_here>
   - Expected output: 200 status with your user and profile data.

### Updating profile
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

### Viewing public profile
6. send GET request on http://127.0.0.1:8000/api/auth/users/testuser/ without any access token to get the public profile
  - Expected output: 200 status with public profile

> Project endpoints

### View listed projects
1. send GET request on http://127.0.0.1:8000/api/projects/ without any access token to get the list of listed projects
  - Expected output: 200 status with list of posted projects

### View the details of one specific project
2. send GET request on http://127.0.0.1:8000/api/projects/{id}/ without any access token to get the project details
  - Expected output: 200 status with project details of that specific project

### View your own projects
3. send GET request on http://127.0.0.1:8000/api/projects/mine/ with the access token to get the project details of your listed projects
  - Expected output: 200 status with only your listed projects

### Search for projects
4. send GET request on http://127.0.0.1:8000/api/projects/?search=test without any access token to search for projects containing that specific keyword
  - Expected output: 200 status with only projects containing that specific keyword

### Update a project
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

### Create a new project
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

> Collaboration request endpoints

### Request for collaboration
7. sign in as another user and send POST request on http://127.0.0.1:8000/api/projects/{id}/requests/ (not on your project but on a different project) with the access token of the second user in the headers tab of Postman in the following way:
    > Authorization: Bearer <your_access_token_here>
and with the following JSON object in the Body -> raw -> JSON:
    ```json
    {
       "message": "I want to collaborate with you on this project"
    }
    ```
    - Expected output: 201 status with created collaboration request.

### See the list of collaboration requests
8. sign in as the main user and send GET request on http://127.0.0.1:8000/api/projects/{id}/requests/ with the access token in the headers tab of Postman in the following way:
    > Authorization: Bearer <your_access_token_here>
    - Expected output: 200 status with list of collaboration requests including the profile data of the other users who have requested for collaboration

### Update the status of the project
9. sign in as the main user and send PATCH request on http://127.0.0.1:8000/api/projects/{id}/requests/{req_id} with the access token in the headers tab of Postman in the following way:
    > Authorization: Bearer <your_access_token_here>
and with the following JSON object in the Body -> raw -> JSON:
    ```json
    {
       "status": "accepted"
    }
    ```
    - Expected output: 200 status with the status of project updated.

### See the collaboration status of the applied projects
10. sign in as second user and send GET request on http://127.0.0.1:8000/api/projects/mine/ with the access token of the second user in the headers tab of Postman in the following way:
    > Authorization: Bearer <your_access_token_here>
    - Expected output: 200 status with list of projects where you have applied as the second user

---

### Frontend endpoints (Test by running the nextjs app)