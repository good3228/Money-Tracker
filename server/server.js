import app from './api/app.js';

const port = 9000;

//set up the server and specify the running port
app.listen(port, () =>{
    console.log(`Server running on port ${port}.`)
})