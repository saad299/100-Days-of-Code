from django.test import TestCase
from accounts.models import User
from .models import Project, CollaborationRequest

# Create your tests here.

class ProjectModelTest(TestCase):
    def test_create_project_with_valid_data(self):
        user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
        project = Project.objects.create(title='Test Project', description='Test Description', owner=user)
        self.assertIsNotNone(project)
        self.assertEqual(project.title, 'Test Project')
        self.assertEqual(project.description, 'Test Description')
        self.assertEqual(project.owner, user)

    def test_project_owner_set_correctly(self):
        user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
        project = Project.objects.create(title='Test Project', description='Test Description', owner=user)
        retrieved_project = Project.objects.get(id=project.id)
        self.assertEqual(retrieved_project.owner, user)
        self.assertEqual(retrieved_project.owner.username, 'testuser')

class CollaborationRequestModelTest(TestCase):
    def test_create_request_with_valid_data(self):
        user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
        project = Project.objects.create(title='Test Project', description='Test Description', owner=user)
        request = CollaborationRequest.objects.create(project=project, requester=user, message='This is a TEST message', status='pending')
        self.assertIsNotNone(request)
        self.assertEqual(request.project, project)
        self.assertEqual(request.requester, user)
        self.assertEqual(request.message, 'This is a TEST message')
        self.assertEqual(request.status, 'pending')