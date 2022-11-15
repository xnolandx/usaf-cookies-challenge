import express from 'express';
const app = express();
const port = 8080;

app.use(express.json())

let moviesArr = [
    {
        "id": 1,
        "title": "Midnight In Paris",
        "runtime": 96,
        "release_year": 2011,
        "director": "Woody Allen",
    },
    {
        "id": 2,
        "title": "Titanic",
        "runtime": 210,
        "release_year": 1997,
        "director": "James Cameron",
    },
    {
        "id": 3,
        "title": "From Paris With Love",
        "runtime": 94,
        "release_year": 2010,
        "director": "Pierre Morel",
    },
 ]

// GET 
app.get('/movies', (req, res) => {
    res.send(moviesArr)
})

// POST
app.post('/movies', (req, res) => {
    let movieToAdd = req.body; // Access the body (payload) of the request
    moviesArr.push(movieToAdd);
    res.send(moviesArr);
})

// PATCH
app.patch('/movies/:id', (req, res) => {
    var { id } = req.params;
    let {title } = req.body;

    moviesArr.forEach((movie, index) => {
        if(movie.id == id) moviesArr[index].title = title; 
    });
    var justAdded = moviesArr.find(movie => movie.id == id);
    res.send(justAdded);
})

// PUT
app.put('/movies/:id', (req, res) => {
    var { id } = req.params; 

    moviesArr.forEach((movie, index) => {
        if(movie.id == id) moviesArr[index] = {
            "id": id,
            "title": "Home Alone",
            "runtime": 103,
            "release_year": 1990,
            "director": "Chris Columbus"
        }
    });

    res.send(moviesArr);
})

// DELETE
app.delete('/movies/:id', (req, res) => {
    var { id } = req.params;
    var updatedMovies = moviesArr.filter(movie => movie.id != id);
    moviesArr = updatedMovies;
    
    res.send("Resource has been deleted.")
})

app.listen(port, () => console.log('Movies server is listening.'))