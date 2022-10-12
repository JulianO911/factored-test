# Factored fullstack test

This github repository contains the fullstack test developed by Julián Ospina Murgueitio.

## Tools
This test was maded in diferent tools for the frontend, backend and data modeling.

### Frontend: 
client part was made with pure Javascript, CSS and HTML. In this case, the application doesn't use any framework like React, Angular or Vue. Views are
based in the template SB Admin 2 from bootstrap found [here](https://startbootstrap.com/theme/sb-admin-2)

### Backend:

Server part was made with the Java framework Spring Boot and allthe packages and dependencies were administrated with Maven. Maven can be
downloaded [here](https://maven.apache.org/download.cgi).

### Data modeling:

For the database, application connects with H2, that supports a basic data arquitecture with SQL. To use the interface, put in the browser localhost:8080/h2-console.

## Project Arquitecture

In the src/main/java/com/factored/excercise are all the package from backend:

### Controllers:
Contains the Employee controller that connects with the front and the services.
### Services:
Contains the Employee services that connects with the database.
### Models:
Contains all the logical model.
### Repositories
Contains all the repositories that connects directly with the tables
*Note: The FullStackTestApplication files runs the main program.

In the src/main/resources directory are the SQL schema and the init data; the application propperties that got the database configuration; and
the static directory that contains all the frontend, including js files (in the js directory), css files, images (img directory) and the html files.

## Functionalities and app structure

The web application begins with and index view that allows user to login or register. For login, user got to introduce the email and password correctly.
*Important: default email and password are julianosm911@gmail.com and unshowmas respectly. After login, the app shows all the employee information (name,
position, email, phone number, the avatar image and a spyder chart with skills (this chart was made with the anychart javascript dependency). 

If user wants to create an account, he got to click on register in the index view and introduce all the information. Then, he can login normally.

## Run app in local machine

For run the application, please install the spring boot tool for the IDE that [page](https://spring.io/tools) shows and run it (make sure that maven is installed). To access, put localhost:8080 in the browser.

That's it. I hope this documentation results useful. Thank you for reading.
