// Import the mongoose module to connect the app with MongoDB
const mongosee = require('mongoose')


//connect mongosee to the local server mongodb
mongosee.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})