# Smart Clock

## Description

This project is a web application built with TypeScript and React. It displays a simple clock with the ability to set and remove alarms.
The backend part has been built Node ans SQlite.

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository to your local machine.

```bash
git clone <repository-url>
```

2. Navigate to the project directory.

```bash
cd smart-clock
```

3. Install the dependencies using npm.

```bash
npm i && cd ./client && npm i && cd ..
```

4. Install the ts-node-esm package globally.

```bash
npm install -g ts-node-esm
```

## Launching the Project

To launch the project, run the following command:

```bash
npm start
```

## About this project

This project has been built following the MVC pattern.
At the backend level we have a server opened on port 3001 by default. In the future this port might be configurable. All requests incoming are passed to the router which redirect them to the right controller.
Each controller communicate with the model related to, to store/delete data in the database.
Once the database modified, the controller returns a response to the client in json format.

At the frontend level, the app runs on port 3000 by default. A proxy has been setup in `package.json` to avoid CORS policy during the development. Once started the app triggers a GET request to the api to get the list of alarms. If alarms exist, they'll be displayed at the top left of the view. A delete button will be displayed at the top right as well to delete the alarm.
The clock is displayed at the middle of the screen and an alarm can be set pressing set button which displays a modal. Here we can set a name and choose when the alarm will ring. If no name are provided, the default one "Alarm" will be applied. We cannot set an alarm in the past. Once set button pressed, a POST request will be triggered to save the alarm in the database.

Some improvements can be done in the future:

- The design is as simple as possible. We can do better.
- If we set too many alarms, at some point they will pass over the clock. We can handle this case by adding a scrollview for instance and limit the height of this scrollview.
- We can add toast messages to notify the user if requests succeed or fail.
- We can add a sound once the alarm time is reached.
- We can make it more responsive.
- And so on so far...
