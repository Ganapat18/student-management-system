from django.shortcuts import render, redirect, get_object_or_404
from .models import Student

def home(request):
    if request.method == "POST":
        if 'add' in request.POST:
            Student.objects.create(
                name=request.POST['name'],
                roll_no=request.POST['roll_no'],
                course=request.POST['course'],
                email=request.POST['email']
            )
            return redirect('/')

        if 'delete' in request.POST:
            Student.objects.filter(id=request.POST['delete']).delete()
            return redirect('/')

    students = Student.objects.all()
    return render(request, 'home.html', {'students': students})


def edit_student(request, id):
    student = get_object_or_404(Student, id=id)

    if request.method == "POST":
        student.name = request.POST['name']
        student.roll_no = request.POST['roll_no']
        student.course = request.POST['course']
        student.email = request.POST['email']
        student.save()
        return redirect('/')

    return render(request, 'edit.html', {'student': student})
