import express, { response } from 'express';
const app = express();
const port = 8080;

app.use(express.json());

let plantsArr = [
    { id: 0, name: 'Lilac', fullSun: true },
    { id: 1, name: 'Queen Palm', fullSun: true },
    { id: 2, name: 'Basil', fullSun: true },
    { id: 3, name: 'Rhododendron', fullSun: false },
]

app.listen(port, () => {
    console.log('Plants server is listening.')
})

app.get('/plants', (req, res) => {
    let { fullSun } = req.query;
    
    if (fullSun !== undefined) {
        fullSun = fullSun === 'true'
        let myPlants = plantsArr.filter(element => element.fullSun === fullSun);
        res.status(200).send(myPlants)
    } else {
        res.status(200).send(plantsArr)
    }  
})

app.get('/plants/:plantId', (req, res) => {
    let { plantId } = req.params
    let myPlant = plantsArr.find(element => {
        return element.id === parseInt(plantId);
    })
    res.status(200).send(myPlant)
})

app.post('/plants', (req, res) => {
    let myPlant = req.body;
    let newPlant = {
        "id": plantsArr.length, 
        ...myPlant
    }
    plantsArr.push(newPlant);
    res.status(201).send(newPlant)
})

app.put('/plants/:plantId', (req, res) => {
    let { plantId } = req.params;

    let myPlantIndex = plantsArr.findIndex(element => {
        return element.id === parseInt(plantId)
    })

    if (myPlantIndex === undefined) {
        response.status(404).send(`Plant Id: ${myPlant} does not exist in Memory Datastore.`)
    } else {
        let updatedPlant = req.body;
        plantsArr[myPlantIndex].name = updatedPlant.name;
        plantsArr[myPlantIndex].fullSun = updatedPlant.fullSun;
        response.status(204).send(plantsArr[myPlantIndex])

    }
})