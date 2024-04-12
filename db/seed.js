const client = require('./client.js');
const { createActivity } = require('./activities.js');
const { createRoutine } = require('./routines.js');
const { createRoutineActivities } = require('./routines_activity.js');


const dropTables = async () => {
  try {

    await client.query(`
    DROP TABLE IF EXISTS routines_activities;
    DROP TABLE IF EXISTS routines;
    DROP TABLE IF EXISTS activities;

    `)
  } catch (error) {
    console.log(error)
  }

}


const createTables = async () => {
  try {
    await client.query(`
    CREATE TABLE activities(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20) UNIQUE NOT NULL,
      description TEXT
    );
    
    CREATE TABLE routines(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20) UNIQUE NOT NULL,
      goal TEXT,
      is_public BOOLEAN
    );

      CREATE TABLE routines_activities(
        id SERIAL PRIMARY KEY,
        activities_id INTEGER REFERENCES activities(id),
        routines_id INTEGER REFERENCES routines(id),
        count INTEGER
      );

    `);

  } catch (error) {
    console.log(error);
  }
};


const connectAndSeed = async () => {
  await client.connect();
  console.log(`is connnected`);


  await dropTables();
  console.log('TABLES DROPPED');

  await createTables();
  console.log(`CREATED TABLES`);

  const running = await createActivity('running', 'walking but faster');
  const benchPress=  await createActivity('bench_press', 'pushing up iron');
  const squats=  await createActivity('squats', 'pushing up iron but with your legs');
  const pushUps=  await createActivity('push_ups', 'pushing up yourself');
  console.log(`ACTIVITY CREATED`);

  const legsDay= await createRoutine('legs_day', true, 'get swole')
  const chestDay= await createRoutine('chest_day', false, 'get big')
  const cardioDay= await createRoutine('cardio_day', true, 'increase heart rate')
  console.log(`ROUTINE CREATED `)


  await createRoutineActivities( running, legsDay, 10);
  await createRoutineActivities( benchPress, chestDay, 20);
  await createRoutineActivities( running, cardioDay, 30);
  await createRoutineActivities( squats, legsDay, 10);
  await createRoutineActivities( pushUps, chestDay, 10);
  console.log(`this workout is done in this routine`)




  await client.end();
  console.log(`DISCONNECTED`);


}
connectAndSeed();
