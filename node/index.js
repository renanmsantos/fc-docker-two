const express =  require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'fullcycle'
}
const connection = mysql.createConnection(dbConfig)
const sql = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id));`
connection.query(sql)
connection.end()

app.get('/', (_,res) => {
    let connection = mysql.createConnection(dbConfig)
    const sql = `INSERT INTO people(name) VALUES('Renan')`
    connection.query(sql)
    let title = "<h1>Full Cycle Rocks!</h1><br><br>";
    connection.query('SELECT * FROM people', (err, row) => {
        if (err) throw err;
        row.forEach(element => {
            title += "<p>NAME: "+ element.name +"</p>"
        });
        res.send(title);
    })
    connection.end()
})

app.listen(port, ()=> {
    console.log("Running on port: " + port)
})