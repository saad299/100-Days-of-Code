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

### Registering (status: working)
1. send POST request on http://127.0.0.1:8000/api/auth/register/ along with the following JSON object in the Body -> raw -> JSON
   - Request body:
     ```json
     {
       "username": "testuser",
       "email": "testuser@example.com",
       "password": "testpassword123",
       "password2": "testpassword123"
     }
     ```
   - Expected output: 201 status with access token, refresh token, and user object.

### Logging in (status: working)
2. send POST request on http://127.0.0.1:8000/api/auth/login/ along with the following JSON object in the Body -> raw -> JSON
   - Request body:
     ```json
     {
       "username": "testuser",
       "password": "testpassword123"
     }
     ```
   - Expected output: 200 status with access token, refresh token, and user object. Copy the access token.

### Refreshing token (status: working)
3. send POST request on http://127.0.0.1:8000/api/auth/token/refresh/ along with the following JSON object in the Body -> raw -> JSON
   - Request body:
     ```json
     {
       "refresh": "your_refresh_token_here"
     }
     ```
   - Expected output: 205 Reset Content status with success message. Copy the new access token.

> Profile endpoints

### Getting profile (status: working)
4. send GET request on http://127.0.0.1:8000/api/auth/users/me/ with the access token in the headers tab of Postman in the following way:
   > Authorization: Bearer <your_access_token_here>
   - Expected output: 200 status with your user and profile data.

### Updating profile (status: working)
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

### Viewing public profile (status: working)
6. send GET request on http://127.0.0.1:8000/api/auth/users/testuser/ without any access token to get the public profile
  - Expected output: 200 status with public profile

> Project endpoints

### View listed projects (status: working)
1. send GET request on http://127.0.0.1:8000/api/projects/ without any access token to get the list of listed projects
  - Expected output: 200 status with list of posted projects

### View the details of one specific project (status: working)
2. send GET request on http://127.0.0.1:8000/api/projects/{id}/ without any access token to get the project details
  - Expected output: 200 status with project details of that specific project

### View your own projects (status: working)
3. send GET request on http://127.0.0.1:8000/api/projects/mine/ with the access token to get the project details of your listed projects
  - Expected output: 200 status with only your listed projects

### Search for projects (status: working)
4. send GET request on http://127.0.0.1:8000/api/projects/?search=test without any access token to search for projects containing that specific keyword
  - Expected output: 200 status with only projects containing that specific keyword

### Update a project (status: working)
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

### Create a new project (status: working)
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

### Request for collaboration (status: working)
7. sign in as another user and send POST request on http://127.0.0.1:8000/api/projects/{id}/requests/ (not on your project but on a different project) with the access token of the second user in the headers tab of Postman in the following way:
    > Authorization: Bearer <your_access_token_here>
and with the following JSON object in the Body -> raw -> JSON:
    ```json
    {
       "message": "I want to collaborate with you on this project"
    }
    ```
    - Expected output: 201 status with created collaboration request.

### See the list of collaboration requests (status: working)
8. sign in as the main user and send GET request on http://127.0.0.1:8000/api/projects/{id}/requests/ with the access token in the headers tab of Postman in the following way:
    > Authorization: Bearer <your_access_token_here>
    - Expected output: 200 status with list of collaboration requests including the profile data of the other users who have requested for collaboration

### Update the status of the project (status: working)
9. sign in as the main user and send PATCH request on http://127.0.0.1:8000/api/projects/{id}/requests/{req_id} with the access token in the headers tab of Postman in the following way:
    > Authorization: Bearer <your_access_token_here>
and with the following JSON object in the Body -> raw -> JSON:
    ```json
    {
       "status": "accepted"
    }
    ```
    - Expected output: 200 status with the status of project updated.

### See the collaboration status of the applied projects (status: working)
10. sign in as second user and send GET request on http://127.0.0.1:8000/api/projects/mine/ with the access token of the second user in the headers tab of Postman in the following way:
    > Authorization: Bearer <your_access_token_here>
    - Expected output: 200 status with list of projects where you have applied as the second user

---

### Frontend endpoints (Test by running the nextjs app)

1. Dashboard (/dashboard): The user lands on their dashboard if they are logged in. If they are not logged in, they land on the website's landing page and from there, they can log in.
> Status: Working as expected

2. Login/Logout(/login, /logout): Login page from where user can login. User can remain logged in for 42 days, meaning the expiry of access token is 42 days after which user is logged out and would need to login again. The expiry of refresh token is 1 hour, meaning if user is on the website for 1 hour straight, the refresh token will expire. Usually this would mean that user would also log out as a result, but the refresh token would automatically re-generate again, so user would stay login even after 1 hour. But after 42 days, user would be log out and would need to login again.
> Status: Both Login and Logout are working as expected.

3. Profile (/profile/[username]): The user clicks the 'profile' button in the navbard to see their profile. The profile contains details user provides. The page also has 'Edit Profile' button that takes the user to 'profile/edit' page where the user can edit their profile. Whatever the user edits or changes on the 'profile/edit' page, should be reflected on the 'profile' page.
> Status: Working as expected

4. Edit Profile (/profile/edit): The user clicks the 'Edit Profile' button on the 'profile' page to edit their profile. Whatever the user edits or changes on the 'profile/edit' page, should be reflected on the 'profile' page.
> Status: Working as expected

5. Browse Projects (/projects): The user can browse all the projects on the website. The user can filter the projects by category, status, and search by title or description. The user can also sort the projects by date, title, or status.
> Status: Working as expected

6. Project Details (/projects/[id]): The user can click on a project to see its details. The user can also click on the 'Apply' button to apply for the project.
> Status: Need work

### Issues
- Fix the issue where the error "An unexpected error occured" shows up on the dashboard and after that, the page loads and the log in screen shows up. The interval of logging in and logging out is of some minutes, after that this error shows up and login screen shows up to log back again. Also, under the 'Expires/Max Age column in cookies tab in Applications tab' in the developer tools, it is showing 'Session', name as "__next_hmr_refresh_hash__", value as '105'. Shouldn't the 'Expires/Max Age' colum show the expiry date of the token and the name to something like 'jwt_token'? Is it showing correctly and showing like it should show? I want the page to be logged in for the at least 6 weeks.
Status: Fixed