How to Run the Project Locally 

 

1. Clone the Repository 

git clone https://github.com/ShravastiSiddharth/FinTarget  

cd <project-directory> 
 

2. Install Dependencies 

npm install 
 

3. Start Redis 

Install and start Redis on your local machine or connect to a Redis service.
For local installation, you can use: 

Extract the zip folder in the GitHub repo. 

From extracted folder run ‘redis-server’ file. 

Then run ‘redis-cli’ from the same folder. 

In redis-cli run command ‘ping’ it should return PONG it means Redis is connected and working. 

Mostly you won’t need it because I have connected my separate Redis cloud instance. 

 

Ensure Redis is running before starting the Node.js application. 
4. Start the Node.js Server 

Node server.js  

Run this in Project Directory 
 

This will start the server on the specified port and create worker processes using Node.js' cluster module. 

5. Testing the API 

Use a tool like Postman or cURL to send POST requests to the API endpoint. 

The request body should include a user_id to simulate task processing. 

Example request: 

For local Environment: 

POST http://localhost:<port>/api/v1/task 
{ 
  "user_id": "123" 
} 
 
