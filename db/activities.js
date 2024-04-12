const client = require("./client")


const createActivity = async (activityName, description) => {
  try {
    const { rows: [activity] } = await client.query(`
    INSERT INTO activities (name, description)
    VALUES ('${activityName}', '${description}')
    RETURNING *;
  `)
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






module.exports = {

  createActivity,
  getActivities

}