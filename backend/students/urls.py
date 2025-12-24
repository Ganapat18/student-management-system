from django.urls import path
from .views import home, edit_student

urlpatterns = [
    path('', home),
    path('edit/<int:id>/', edit_student, name='edit'),
]
