from django.test import TestCase
from .models import User

# Create your tests here.

class UserModelTest(TestCase):
    def test_create_user_with_valid_data(self):
        user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
        self.assertIsNotNone(user)
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'test@example.com')
    
    def test_user_fields_are_set_correctly(self):
        user = User.objects.create_user(username='john_doe', email='john@test.com', password='password123')
        retrieved_user = User.objects.get(username='john_doe')
        self.assertEqual(retrieved_user.username, 'john_doe')
        self.assertEqual(retrieved_user.email, 'john@test.com')
        self.assertTrue(retrieved_user.is_active)
        self.assertFalse(retrieved_user.is_staff)
        self.assertFalse(retrieved_user.is_superuser)

    # This results in FAILURE because the email field is not validated in the create_user method
    def test_create_user_with_no_email_raises_error(self):
        with self.assertRaises(ValueError):
            User.objects.create_user(username='testuser', email='', password='testpass123')

    # This results in SUCCESS because the password is hashed and not stored as plaintext
    def test_password_is_hashed_not_stored_plaintext(self):
        user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
        self.assertNotEqual(user.password, 'testpass123')
        self.assertTrue(user.check_password('testpass123'))
        self.assertFalse(user.check_password('wrongpass'))