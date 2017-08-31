# Schedulecture

Link to API DOCS

https://documenter.getpostman.com/view/2254824/schedulecture-api/6nBuVPi



### Clone the repository and install node packages
> Please ensure you have the latest version of Nodejs and Node Package Manager (NPM) installed
```
git clone https://github.com/aayusharora/Schedulecture
cd Schedulecture
npm install
```
### Configure the Database 

> Install Postgres or mysql, and use the following commands to setup the database and new role.

create database scheduledb

In .dbconfig file

Configure the user and password in .dbconfig file in the root folder.

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
