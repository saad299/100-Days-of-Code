from django.test import TestCase
from accounts.models import User
from .models import Project, CollaborationRequest
from rest_framework.test import APIClient
# from django.urls import reverse

# Create your tests here.

class ProjectModelTest(TestCase):
    def test_create_project_with_valid_data(self):
        # ARRANGE: a world with 1 user
        user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
        
        # ACT: one action — create a project
        project = Project.objects.create(title='Test Project', description='Test Description', owner=user)
        
        # ASSERT: my expectations about the result
        self.assertIsNotNone(project)
        self.assertEqual(project.title, 'Test Project')
        self.assertEqual(project.description, 'Test Description')
        self.assertEqual(project.owner, user)

    def test_project_owner_set_correctly(self):
        # ARRANGE: a world with 1 user
        user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
        
        # ACT: one action — create a project
        project = Project.objects.create(title='Test Project', description='Test Description', owner=user)
        
        # ASSERT: my expectations about the result
        retrieved_project = Project.objects.get(id=project.id)
        self.assertEqual(retrieved_project.owner, user)
        self.assertEqual(retrieved_project.owner.username, 'testuser')

class CollaborationRequestModelTest(TestCase):
    def test_create_request_with_valid_data(self):
        # ARRANGE: a world with 1 user and 1 project
        user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
        project = Project.objects.create(title='Test Project', description='Test Description', owner=user)
        
        # ACT: one action — create a collaboration request
        request = CollaborationRequest.objects.create(project=project, requester=user, message='This is a TEST message', status='pending')
        
        # ASSERT: my expectations about the result
        self.assertIsNotNone(request)
        self.assertEqual(request.project, project)
        self.assertEqual(request.requester, user)
        self.assertEqual(request.message, 'This is a TEST message')
        self.assertEqual(request.status, 'pending')

class ListProjectsIntegrationTest(TestCase):
    def test_list_projects_unauthenticated(self):
        # ARRANGE: a world with 1 user and 2 projects
        user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
        Project.objects.create(title='Test Project 1', description='Test Description 1', owner=user)
        Project.objects.create(title='Test Project 2', description='Test Description 2', owner=user)
        
        # ACT: one action — an unauthenticated GET request
        client = APIClient()
        response = client.get('/api/projects/')
        
        # ASSERT: my expectations about the result (get 200 OK response most probably)
        self.assertEqual(response.status_code, 200) # I expect 200 OK response
        self.assertIsInstance(response.data, list) # I expect a list response
        self.assertEqual(len(response.data), 2) # I expect 2 projects
        self.assertEqual(response.data[0]['title'], 'Test Project 1') # I expect the first project to have the title 'Test Project 1'
        self.assertEqual(response.data[1]['title'], 'Test Project 2') # I expect the second project to have the title 'Test Project 2'