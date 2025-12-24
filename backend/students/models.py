from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    roll_no = models.IntegerField(unique=True)
    course = models.CharField(max_length=50)
    email = models.EmailField()

    def __str__(self):
        return self.name
