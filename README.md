# Welcome to Back-end 

This project is designed to control tasks: -receiving, -adding, -deleting, -editing.

### I invite you to the site to use the to-do list that demonstrates the result of the code:
https://igorinni.github.io/ToDo-List/

### The project structure itself:

- /routes - This folder would contain all the routes that you have created using Express Router and what they do would be exported from a Controller file
- /middlewares - This folder would contain all the middleware that you have created, whether it be authentication/some other function.
- /config - This folder with configuration files for third party APIs/services


### Server interaction

To get a list of all tasks: 
1) use the GET method 
2) enter the URL: https://best-todo-list.onrender.com/tasks

To add a task to the list:
1) use the POST method
2) enter the URL: https://best-todo-list.onrender.com/task

To change a task:
1) use the PATCH method
2) enter the URL: https://best-todo-list.onrender.com/task/id

To delete a task:
1) use the DELETE method
2) enter the URL: https://best-todo-list.onrender.com/task/id

To delete all tasks:
1) use the DELETE method
2) enter the URL: https://best-todo-list.onrender.com/tasks