import express from 'express';
import cookieParser from 'cookie-parser';


const app = express();
const port = 8080;

app.use(cookieParser())

app.get('/login/:name', (req, res) => {
    let { name } = req.params
    res.cookie("name", name);
    res.end()
})

app.get('/hello', (req, res) => {

    if (req.cookies.name){
        let name = req.cookies.name
        res.status(200).end(`Hello ${name}`)
    } else {
        res.redirect('/login')
    }

})

app.listen(port, () => console.log('cookies server is listening on port 8080.'))