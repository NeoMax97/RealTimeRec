const app = require('./server/server.js');
const mongoose = require('mongoose');

let port = 3000;

mongoose.connect(process.env.REAL_REC_MONGODB_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => console.log('DB Connected!')
    ).catch(err => {console.log(`DB Connection Error: ${err.message}`);})

app.listen(port);