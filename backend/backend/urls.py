from django.contrib import admin   # ← ADD THIS LINE
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('students.api_urls')),
]
