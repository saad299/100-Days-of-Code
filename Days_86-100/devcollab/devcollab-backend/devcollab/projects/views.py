from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q

from .models import Project, CollaborationRequest
from .serializers import ProjectSerializer
from .permissions import IsOwner, IsProjectOwner

# Create your views here.

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset =  Project.objects.filter(is_open=True).select_related(
            'owner__profile'
        )

        search = self.request.query__params.get('search', '').strip()
        tech_stack = self.request.query__params.get('tech_stack', '').strip()
        role = self.request.query__params.get('role', '').strip()

        if seach:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(tech_stack__icontains=search)
            ).distinct()

        if tech_stack:
            queryset = queryset.filter(
                Q(tech_stack__icontains=tech_stack)
            ).distinct()

        if role:
            queryset = queryset.filter(
                Q(role__icontains=role)
            ).distinct()

        return queryset

    def get_permissions():
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        if self.action == 'create':
            return [IsAuthenticated()]
        if self.action in ['update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsOwner()]
        if self.action == 'mine':
            return [IsAuthenticated()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        return context

    @action(detail=False, methods=['get'], url_path='mine')
    def mine(self, request):
        projects = Project.objects.filter(owner=request.user).select_related('owner__profile').order_by('-created_at')
        serializer = self.get_serializer(
            projects,
            many=True,
            context=self.get_serializer_context()
        )
        return Response(serializer.data, status=status.HTTP_200_OK)
