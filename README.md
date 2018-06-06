# Schedulecture

## Demo

Coding Blocks Timetable (Production)  
https://timetable.codingblocks.com


Heroku Link (Staging)   
https://schedulecture.herokuapp.com/

Link to API DOCS

https://documenter.getpostman.com/view/2254824/schedulecture-api/6nBuVPi



### Clone the repository and install node packages
> Please ensure you have the latest version of Nodejs and Node Package Manager (NPM) installed
```
git clone https://github.com/coding-blocks/schedulecture
cd Schedulecture
npm install
```
### Configure the Database 

> Install Postgres or mysql, and use the following commands to setup the database and new role.

Use dbconfig-sample.json file to create your own dbconfig.json file containing the user, password and database for schedulecture. Mention the dialect and host('localhost') as well. 

For creating a new database, user and give access to the user see:
https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e

For mysql,
mention the dialect : 'mysql'
port: 3306

For postgresql,
mention the dialect : 'postgres'
port: 5432


# Running the app
```
node server.js
```
