from django.urls import path
from .api_views import student_list

urlpatterns = [
    path('students/', student_list),
]
