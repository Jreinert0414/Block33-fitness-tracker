const client = require("./client")

const createRoutine = async (routineName, isPublic, goalDescription) => {

  try {
    const {rows:[routine]}= await client.query(`
    INSERT INTO routines (name, is_public, goal)
    VALUES ('${routineName}', '${isPublic}', '${goalDescription}')
    RETURNING *;
    `)
    return routine
} catch (error){
  console.log(error)
}
}
const getRoutines = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM routines;
    `);
    return rows;
  } catch (error) {
    console.log(error)
  }

}



module.exports= {
 
  createRoutine,
  getRoutines

}