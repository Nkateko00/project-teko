const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();
const fs = require('fs');
const { constrainedMemory } = require('process');
const { error } = require('console');

const app = express();
const PORT = process.env.PORT || 2001;
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

// Set up SQL db
const dbPath = process.env.DATABASE_URL || path.join(__dirname, 'pro.db');
const port = process.env.PORT || 2001

const db = new sqlite3.Database(dbPath, (err) =>{
    if(err){
        console.error(err.message);
    }
    console.log('Connected to SQLite3 db')
});

console.log(`Server connected on port ${port}`)

// Read & execute SQL file

// fs.readFile('clients-db.sql','utf8',(err,data)=>{
//     if(err){
//         console.error('Error reading schema file:', err);
//         return;
//     }
//     db.exec(data, (err)=>{
//         if(err){
//             console.error('Error executing schema:', err);
//         }
//         else{
//             console.log('Database client sql query created successfully.')
//         }     
//     });
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'aboutMe.html'));
});

app.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'backEnd.html'));
});

app.get('/front', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'frontEnd.html'));
});

app.get('/qa', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'qa.html'));
});

app.post('/submit', (req, res)=>{
    const {fullName,fullNumber,fullMail,fullContactSubject,fullMessage } = req.body; 
    // Insert data into db
    const sql =`INSERT INTO cliental (fullName, fullNumber, fullMail, fullContactSubject, fullMessage) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql,[fullName,fullNumber,fullMail,fullContactSubject,fullMessage], function(err){    
        if (err) {
            console.error('There was an error capturing message:', err.message);
            return res.status(500).json({error: err.message})

        }
        res.json({message: "Message has been successfully sent, thanks for contacting me!"});
    });
    
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
