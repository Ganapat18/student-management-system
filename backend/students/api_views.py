from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def student_list(request):
    if request.method == 'GET':
        students = Student.objects.all()
        return Response(StudentSerializer(students, many=True).data)

    if request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

    if request.method == 'PUT':
        student_id = request.query_params.get('id')
        student = Student.objects.get(id=student_id)
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

    if request.method == 'DELETE':
        student_id = request.query_params.get('id')
        Student.objects.filter(id=student_id).delete()
        return Response({'message': 'Deleted'})
