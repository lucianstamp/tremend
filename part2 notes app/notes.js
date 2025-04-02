const express = require('express');
const app = express();

app.use(express.json());

let notes = [];

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Notes API</title>
            <style>
                body { font-family: Arial; max-width: 800px; margin: 0 auto; padding: 20px; }
                .note { margin: 10px 0; padding: 10px; background: #f0f0f0; }
                button { padding: 5px 10px; }
                input, textarea { margin: 5px; padding: 5px; width: 300px; }
            </style>
        </head>
        <body>
            <h1>Notes API</h1>
            <div>
                <h3>Create New Note</h3>
                <input type="text" id="title" placeholder="Title"><br>
                <textarea id="content" placeholder="Content"></textarea><br>
                <button onclick="createNote()">Create Note</button>
            </div>
            <h3>Notes List</h3>
            <div id="notesList"></div>

            <script>
                loadNotes();

                async function createNote() {
                    const title = document.getElementById('title').value;
                    const content = document.getElementById('content').value;
                    
                    const response = await fetch('/notes', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({title, content})
                    });
                    
                    const result = await response.json();
                    if (!response.ok) {
                        alert(result.error);
                        return;
                    }
                    
                    document.getElementById('title').value = '';
                    document.getElementById('content').value = '';
                    loadNotes();
                }

                async function loadNotes() {
                    const response = await fetch('/notes');
                    const notes = await response.json();
                    const notesList = document.getElementById('notesList');
                    
                    notesList.innerHTML = notes.map(note => 
                        '<div class="note"><strong>' + note.title + '</strong><br>' + note.content + '</div>'
                    ).join('');
                }
            </script>
        </body>
        </html>
    `);
});

app.post('/notes', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content required' });
    }
    
    const note = {
        id: notes.length + 1,
        title,
        content,
        created_at: new Date().toISOString()
    };
    
    notes.push(note);
    res.status(201).json(note);
});

app.get('/notes', (req, res) => {
    res.json(notes);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
