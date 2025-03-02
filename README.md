
# Gamify Wellness

A community-driven app designed to promote a healthy lifestyle by allowing users to share the number of Yogasanas they complete and rate the difficulty of each pose. This app fosters motivation, engagement, and accountability among users through gamification.


## Features

- Track and log Yogasanas performed
- View leaderboards and community progress
- Connect with like-minded individuals
- Earn rewards and achievements for consistency


## Tech Stack

**Client:** 
- *Framework: React.js* – Component-based UI library
- *Styling: Tailwind CSS* – Utility-first CSS framework
- *Routing: React Router* – For handling navigation
- *API Handling*: Axios – HTTP requests
- *Deployment*: Netlify – Hosting

**Server:** 
- *Node.js* - Server-side runtime  
- *Express.js* - Web framework for handling routes and middleware  
- *MongoDB* - NoSQL database for storing user progress, asanas, etc.  
- *Mongoose* - ODM (Object Data Modeling) for MongoDB  
- *JWT (JSON Web Token)* - Authentication and authorization  
- *bcrypt* - Password hashing (if authentication is implemented)  
- *Moment.js* - Handling dates and times (for tracking progress)


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
  npm run dev
```
    
## API Reference

#### Base URI

```http
  https://yogasanas.onrender.com/api/asanas

```


#### Get all asanas

```http
  GET /api/asanas
```

| Route |Description                |
| :-------- |:------------------------- |
| `/api/asanas` | Get all asanas |


#### Get specific asana

```http
  GET /api/asanas/:asanaId
```

| Route |Description                |
| :-------- |:------------------------- |
| `/api/asanas/:asanaId` | Get a specific asana |


#### POST a asana

```http
  POST /api/asanas
```

| Route |Description                |
| :-------- |:------------------------- |
| `/api/asanas` |Add a new asana |


#### Edit an asanas

```http
  PATCH /api/asanas
```

| Route |Description                |
| :-------- |:------------------------- |
| `/api/asanas/:asanaId` | Edit asana details |


#### Delete a asanas

```http
  DELETE /api/asanas
```

| Route |Description                |
| :-------- |:------------------------- |
| `/api/asanas/:asanaId` | Delete an asana  |





## Deployed Link


```http
https://reactors-yogasana.netlify.app/
```


## Demo

https://drive.google.com/drive/folders/1uQ0ErgSKl7NiydTo0jl1Kb3llBevfjba?usp=sharing


## Authors

- [@TusharWasake](https://www.github.com/TusharWasake)
- [@SharvariPatil](https://www.github.com/psharvari11)
- [@MansiChavan](https://www.github.com/Mansi-Chavan17)

