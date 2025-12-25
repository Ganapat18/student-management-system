const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// HOME
app.get('/', async (req, res) => {
    const { data } = await axios.get('http://127.0.0.1:8000/api/students/');

    let html = `
<!DOCTYPE html>
<html>
<head>
    <title>Student Management</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container mt-5">
    <h2 class="text-center mb-4">Student Management System</h2>

    <div class="card p-4 mb-4 shadow">
        <h4>Add Student</h4>
        <form method="POST">
            <input class="form-control mb-2" name="name" placeholder="Name" required>
            <input class="form-control mb-2" name="roll_no" placeholder="Roll No" required>
            <input class="form-control mb-2" name="course" placeholder="Course" required>
            <input class="form-control mb-2" name="email" placeholder="Email" required>
            <button class="btn btn-primary w-100">Add Student</button>
        </form>
    </div>

    <table class="table table-bordered table-hover shadow bg-white">
        <thead class="table-dark">
            <tr>
                <th>Name</th>
                <th>Roll</th>
                <th>Course</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
`;

    data.forEach(s => {
        html += `
        <tr>
            <td>${s.name}</td>
            <td>${s.roll_no}</td>
            <td>${s.course}</td>
            <td>${s.email}</td>
            <td>
                <a href="/edit/${s.id}" class="btn btn-sm btn-warning">Edit</a>
                <form method="POST" action="/delete" style="display:inline;">
                    <input type="hidden" name="id" value="${s.id}">
                    <button class="btn btn-sm btn-danger">Delete</button>
                </form>
            </td>
        </tr>`;
    });

    html += `
        </tbody>
    </table>
</div>

</body>
</html>
`;
    res.send(html);
});


// ADD
app.post('/', async (req, res) => {
    await axios.post('http://127.0.0.1:8000/api/students/', req.body);
    res.redirect('/');
});

// EDIT PAGE
app.get('/edit/:id', async (req, res) => {
    const { data } = await axios.get('https://student-management-system-iz7d.onrender.com/api/students/');
    const s = data.find(x => x.id == req.params.id);

    res.send(`
        <h2>Edit Student</h2>
        <form method="POST">
            <input name="name" value="${s.name}">
            <input name="roll_no" value="${s.roll_no}">
            <input name="course" value="${s.course}">
            <input name="email" value="${s.email}">
            <button>Update</button>
        </form>
    `);
});

// UPDATE
app.post('/edit/:id', async (req, res) => {
    await axios.put(
        `http://127.0.0.1:8000/api/students/?id=${req.params.id}`,
        req.body
    );
    res.redirect('/');
});

// DELETE
app.post('/delete', async (req, res) => {
    await axios.delete(
        `http://127.0.0.1:8000/api/students/?id=${req.body.id}`
    );
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Express running on http://localhost:3000');
});
