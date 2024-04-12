const client = require("./client")

const createRoutineActivities =async (activities, routines, count) => {

try{
  await client.query(`
  INSERT INTO routines_activities (activities_id, routines_id, count)
  VALUES ('${activities.id}','${routines.id}','${count}');
  `)

}catch (error) {

  console.log(error)

}

}

module.exports = {
  createRoutineActivities
}