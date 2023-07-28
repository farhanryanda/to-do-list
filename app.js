// Import the express module to create an application and handle HTTP requests
const express = require('express')

// require folder /util/db to import mongodb database
require('./util/db')
const Todo = require('./model/todo')

//use express and port 3000 for local server
const app = express()
const port = 3000

// set ejs as view engine
app.set('view engine', 'ejs')

// Serve static files from the "public" folder to use style.css
app.use(express.static("public"));
// Parse incoming requests with URL-encoded payloads and populate the req.body object
app.use(express.urlencoded({ extended: true }));

// get method to display all to do lists (active or completed) that the user has entered
app.get('/', async(req,res) => {
    const todos = await Todo.find()

    res.render('all', {
        todos
    })
})

// get method to display all to-do lists (active only) that the user has entered
app.get('/active', async(req,res) => {
    const todos = await Todo.find()

    res.render('active', {
        todos
    })
})

// get method to display all to-do lists (completed only) that the user has entered
app.get('/completed', async(req,res) => {
    const todos = await Todo.find()

    res.render('completed', {
        todos
    })
})

// to send todo to database with status unchecked(active) and re-render for all page
app.post('/', (req,res) => {
    const newTodo = {
        task: req.body.task,
        status: 'unchecked'
      }

    Todo.insertMany(newTodo, (error,result) => {
        res.redirect('/')
    })
})

// to send todo to database with status unchecked(active) and re-render for active page
app.post('/active', (req,res) => {
    const newTodo = {
        task: req.body.task,
        status: 'unchecked'
      }

    Todo.insertMany(newTodo, (error,result) => {
        res.redirect('/active')
    })
})

// to send todo to database with status checked(completed) and re-render for completed page
app.post('/completed', (req,res) => {
    const newTodo = {
        task: req.body.task,
        status: 'checked'
      }

    Todo.insertMany(newTodo, (error,result) => {
        res.redirect('/completed')
    })
})

//to delete one of the todos selected by the user in all page and after that it redirect to all page
app.post('/delete',(req,res) => {
    Todo.deleteOne({ _id: req.body._id }).then((result) => {
        res.redirect('/') 
    })
})

//to delete one of the todos selected by the user in active page and after that it redirect to active page
app.post('/deleteactive',(req,res) => {
    Todo.deleteOne({ _id: req.body._id }).then((result) => {
        res.redirect('/active') 
    })
})

//to delete one of the todos selected by the user in completed page and after that it redirect to completed page
app.post('/deletecompleted',(req,res) => {
    Todo.deleteOne({ _id: req.body._id }).then((result) => {
        res.redirect('/completed') 
    })
})

//to edit to the todo if the status is completed/active with a checkbox trigger and redirect to all page
app.post("/edit", (req, res) => {
    const statusCheck = req.body.status
    // console.log(req.body.idcheck)
    // console.log(statusCheck)
    const newStatus = statusCheck !== 'checked' ? 'checked' : 'unchecked'
  
    Todo.updateOne({
        _id: req.body.idcheck
    },
    {
        $set: {
            status: newStatus
        }
    }).then((result) => {
        res.redirect(`/`)
    })
})

//to edit to the todo if the status is completed/active with a checkbox trigger and redirect to active page
app.post("/editactive", (req, res) => {
    const statusCheck = req.body.status
    let newStatus = statusCheck !== 'checked' ? 'checked' : 'unchecked'
  
    Todo.updateOne({
        _id: req.body.idcheck
    },
    {
        $set: {
            status: newStatus
        }
    }).then((result) => {
        res.redirect(`/active`)
    })
})

//to edit to the todo if the status is completed/active with a checkbox trigger and redirect to completed page
app.post("/editcompleted", (req, res) => {
    const statusCheck = req.body.status
    const newStatus = statusCheck !== 'checked' ? 'checked' : 'unchecked'
  
    Todo.updateOne({
        _id: req.body.idcheck
    },
    {
        $set: {
            status: newStatus
        }
    }).then((result) => {
        res.redirect(`/completed`)
    })
})

//to delete all todos in the database and redirect to completed page
app.post('/delete-all', (req,res) => {
    Todo.deleteMany({}, (err) => {
        if (err) {
          console.error(err)
          res.status(500).send('There was an error deleting all todos.')
        } else {
          res.redirect('/completed')
        }
      })
})

//to listen http://localhost:${port}
app.listen(port, () => {
    console.log(`To-do-list App | listening at http://localhost:${port}`)
})