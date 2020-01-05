# VUTTR (Very Useful Tools to Remember) :bat:

Project developed for Bossabox's Very Useful Tools to Remember backend challenge :bat:, ([see the challenge here](https://www.notion.so/Back-end-0b2c45f1a00e4a849eefe3b1d57f23c6)). For the development of the project were used technologies such as Node.js, Sequelize ORM, Express.js, Docker containers for the API and for the database PostgreSQL. Automated tests were created using Jest, Supertest, Factory-girl and Sqlite3. The documentation was created using the API Blueprint format.

## Index

- [VUTTR (Very Useful Tools to Remember) :bat:](#vuttr-very-useful-tools-to-remember-bat)
  - [Index](#index)
  - [About VUTTR](#about-vuttr)
  - [Pre-install](#pre-install)
  - [Installation](#installation)
  - [Examples of what VUTTR can do](#examples-of-what-vuttr-can-do)
    - [Create a new user](#create-a-new-user)
    - [Create a session](#create-a-session)
    - [Create a new tool](#create-a-new-tool)

## About VUTTR

VUTTR is an API that follows the Rest style. It was created to be a repository of useful tools to remember. In addition to being able to register, view, change and delete tools the API has session management, user control where beyond the basics it is also possible to include an avatar for it.

## Pre-install

Before you use this application i strongly recommend you install Docker, because the api was created to work this way.

## Installation

- Clone this with git clone https://github.com/DavidStinghen/VUTTR.git;
- Run yarn to install node dependencies;
- Configure .env file like .env.example, using your own credentials;
- Start your Docker and run docker-compose up --build;
- Run yarn sequelize db:migrate;

## Examples of what VUTTR can do

### Create a new user

You can create a new user by adding name, mail, and password.

POST route:
```
http://localhost:3000/users
```

JSON body:
```
{
	"name": "Test User",
	"email": "testuser@mailtest.com.br",
	"password": "12345678"
}
```

Return:
```
{
  "id": 1,
  "name": "Test User",
  "email": "testuser@mailtest.com.br",
  "provider": false
}
```

### Create a session

you can start a session using the email and password used in the registration, the session will generate a token for the authorizations required to use the application.

POST route:
```
http://localhost:3000/session
```

JSON body:
```
{
  "email": "testuser@mailtest.com.br",
  "password": "12345678"
}
```

Return:
```
{
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "testuser@mailtest.com.br"
  },
   "token":   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTYzMDM1ODIxLCJleHAiOjE1NjM2NDA2MjF9.lInf1Rw68CKgFhNRCt7FduULdsTTkb8JmPsm_iEfG_8"
}
```

### Create a new tool

If you are logged in to the API you can include a tool with a title, link, description and tags to make searching easier later.

POST route:
```
http://localhost:3000/tools
```

JSON body:
```
{
	"title": "hotel",
  "link": "https://github.com/typicode/hotel",
  "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
  "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
}
```

Return:
```
{
  "id": 1,
  "title": "hotel",
  "link": "https://github.com/typicode/hotel",
  "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
  "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
}
```

