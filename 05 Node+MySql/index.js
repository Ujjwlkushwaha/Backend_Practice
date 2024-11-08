
// Initalization faker.js
const { faker } = require('@faker-js/faker'); // goto npm for more details 
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'Delta_app',
  password: '2003'
});

try {
  let q = 'show tables';
  connection.query( q, (err , result)=>{
      if(err) throw err;
      console.log(result);// [ { Tables_in_delta_app: 'temp' } ]
      console.log("Number of tables: " , result.length);
  })
} catch (err) {
  console.error(err);
}

connection.end();


// let getRandomUser =() =>{
//     return {
//       userId: faker.string.uuid(),
//       username: faker.internet.userName(),
//       email: faker.internet.email(),
//     //   avatar: faker.image.avatar(),
//       password: faker.internet.password(),
//     //   birthdate: faker.date.birthdate(),
//     //   registeredAt: faker.date.past(),
//     };
// }

// console.log( getRandomUser() );
