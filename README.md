# Welcome to Back-end 

This project is designed to control tasks: -receiving, -adding, -deleting, -editing.


### The project structure itself:
- /controllers - This folder would contain all the functions for your APIs.
- /routes - This folder would contain all the routes that you have created using Express Router and what they do would be exported from a Controller file
- /middlewares - This folder would contain all the middleware that you have created, whether it be authentication/some other function.
- /config - This folder with configuration files for third party APIs/services


### To start a project:
1) Enter command: git clone https://github.com/Igorinni/Back-end-for-ToDo-List.git 
2) Enter command to install dependencies: npm install
3) Enter command: node index

### Server interaction
To get a list of all tasks: 
1) use the GET method 
2) enter the URL: http://localhost:5000/tasks

To add a task to the list:
1) use the POST method
2) enter the URL: http://localhost:5000/task

To change a task:
1) use the PATCH method
2) enter the URL: http://localhost:5000/task/id

To delete a task:
1) use the DELETE method
2) enter the URL: http://localhost:5000/task/id

To delete all tasks:
1) use the DELETE method
2) enter the URL: http://localhost:5000/tasks