const app = require('./server/server.js');
const mongoose = require('mongoose');

//Specify port number
let port = 3000;

//Connect to the database
mongoose.connect(process.env.REAL_REC_MONGODB_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => console.log('DB Connected!')
    ).catch(err => {console.log(`DB Connection Error: ${err.message}`);})

//Start the server on the specified port
app.listen(port);