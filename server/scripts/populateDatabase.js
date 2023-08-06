const axios = require('axios');
const signupApi = 'http://localhost:3001/api/v1/user/signup';
const transactionsApi = 'http://localhost:3001/api/v1/user/{userId}/transactions';

const users = [
    {
        firstName: 'Tony',
        lastName: 'Stark',
        email: 'tony@stark.com',
        password: 'password123'
    },
    {
        firstName: 'Steve',
        lastName: 'Rogers',
        email: 'steve@rogers.com',
        password: 'password456'
    }
];

users.forEach(user => {
  axios
  .post(signupApi, user)
  .then(response => {
      const userId = response.data.body.id;  // Using body.id to get the user's ID
      
      const transaction = {
          amount: Math.floor(Math.random() * 1000),  // Just an example; you can set your own amounts
          description: `Transaction for ${user.firstName}`
      };

      // Now, let's add a transaction for the user
      axios.post(transactionsApi.replace('{userId}', userId), transaction)
          .then(response => console.log(response.data))
          .catch(error => console.log(error));
  })
  .catch(error => console.log(error));
});