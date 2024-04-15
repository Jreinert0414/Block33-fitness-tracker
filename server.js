const express = require('express')
const app =express();

const client = require('./db/client')
client.connect();
const { createActivity, getActivities, getOneActivity, deleteActivity} = require('./db/activities.js');
const { createRoutine, getRoutines, getOneRoutine, deleteRoutine} = require('./db/routines.js');

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get('/',(req, res, next)=>{
})

app.get('/api/v1/activities', async (req, res)=>{
 try{
  const allActivities = await getActivities();
  res.send(allActivities)
 }catch(error){
  console.log(error)

 }
});

app.get('/api/v1/activities/:id', async (req, res)=>{
  try{
    const activity = await getOneActivity(req.params.id);
    res.send(activity);
    console.log(req);
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

app.get('/api/v1/routines/:id', async (req, res)=>{
  try{
    const routine = await getOneRoutine(req.params.id);
    res.send(routine);
    console.log(req.params);
  }catch(error){
    console.log(error)
  }
})



app.post('/api/v1/activities', async (req, res)=>{
try{
  const {name, description}= req.body
  const newActivity = await createActivity(name, description);
  res.send(newActivity);
}catch(error){
console.log(error)
}
})

app.post('/api/v1/routines', async (req, res)=>{
const {name, isPublic, goal}= req.body
const newRoutine = await createRoutine(name, isPublic, goal )
res.send(newRoutine)

})

app.post('/api/v1/routines_activity', async (req, res)=>{
  const {activity, routine, count}= req.body
  const newRoutineActivity = await createRoutine(activity, routine, count )
  res.send(newRoutineActivity)
  
  })



app.delete('/api/v1/activities/:id', async (req, res, next) => {
  try {
      const activity = await deleteActivity(req.params.id);
      res.send(activity);
  } catch (error) {
      next(error);
  }
});

app.delete('/api/v1/routines/:id', async (req, res, next) => {
  try {
      const routine = await deleteRoutine(req.params.id);
      res.send(routine);
  } catch (error) {
      next(error);
  }
});





app.listen(4000, ()=>console.log(`listening on port 4000`))