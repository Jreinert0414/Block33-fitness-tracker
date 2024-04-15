const client = require("./client")


const createActivity = async (name, description) => {
  try {
    const { rows: [activity] } = await client.query(`
    INSERT INTO activities (name, description)
    VALUES ($1, $2)
    RETURNING*;
  `,[name, description]);
  console.log( `NAME`,name)
    return activity
  } catch (error) {
    console.log(error)

  }
}


const getActivities = async () => {
  try {
    const { rows } = await client.query(`
    SELECT * FROM activities;
    `);
    return rows;
  } catch (error) {
    console.log(error)
  }

}

const getOneActivity = async(id)=>{
  
  try{
    const {rows:[activity]}= await client.query(`
      SELECT * FROM activities
      WHERE id = $1;
    `,[id]);
    return activity;
   
   
  } catch(error) {
    console.log(error)
  }
}

const deleteActivity =async(id)=>{
  try {
    const { rows: [activiy] } = await client.query(`
        DELETE FROM activities
        WHERE id=$1
        RETURNING *;
    `, [id]);
    return activiy;
} catch (error) {
    throw error;
}
}




module.exports = {

  createActivity,
  getActivities,
  getOneActivity,
  deleteActivity
  

}