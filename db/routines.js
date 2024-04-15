const client = require("./client")

const createRoutine = async (routineName, isPublic, goalDescription) => {

  try {
    const {rows:[routine]}= await client.query(`
    INSERT INTO routines (name, is_public, goal)
    VALUES ($1,$2,$3)
    RETURNING *;
    `,[routineName, isPublic, goalDescription])
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


const getOneRoutine = async(id)=>{
  
  try{
    const {rows:[routine]}= await client.query(`
      SELECT * FROM routines
      WHERE id = $1;
    `,[id]);
    return routine;
   
   
  } catch(error) {
    console.log(error)
  }
}

const deleteRoutine =async(id)=>{
  try {
    const { rows: [routine] } = await client.query(`
        DELETE FROM routines
        WHERE id=$1
        RETURNING *;
    `, [id]);
    return routine;
} catch (error) {
    throw error;
}
}


module.exports= {
 
  createRoutine,
  getRoutines,
  getOneRoutine,
  deleteRoutine

}