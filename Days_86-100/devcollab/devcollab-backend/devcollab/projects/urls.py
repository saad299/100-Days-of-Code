from django.urls import include, path
from views import ProjectViewSet
from rest_framework import DefaultRouter

router = DefaultRouter()
router.register(
    prefix='projects',
    viewset=ProjectViewSet,
    basename='project'
)

urlpatterns = [
    path('', include(router.urls)),
    # path('', views.ProjectListCreateView.as_view(), name='project-list-create'),
    # path('<int:pk>/', views.ProjectDetailView.as_view(), name='project-detail'),
]