const express = require('express')
const app =express();

const client = require('./db/client')
client.connect();
const { createActivity, getActivities } = require('./db/activities.js');
const { createRoutine, getRoutines } = require('./db/routines.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/',(req, res, next)=>{
})

app.get('/api/v1/activities', async (req, res)=>{
 try{
  const allActivities = await getActivities();
  res.send(allActivities)
 }catch(error){
  console.log(error)

 }
})



app.get('/api/v1/routines', async (req, res)=>{
 try{
  const allRoutines = await getRoutines();
  res.send(allRoutines)
 }catch(error){
  console.log(error)

 }
})


app.post('/api/v1/activities', async (req, res)=>{

const {name, description}= req.body
const newActivity = await createActivity(name, description);
res.send(newActivity)

})

app.post('.api/v1/routines', async (req, res)=>{
const {name, goal, isPublic}= req.body
const newRoutine = await createRoutine(name, goal, isPublic)
res.send(newRoutine)

})




app.listen(8080, ()=>console.log(`listening on port 8080`))