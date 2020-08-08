# Mern Todo App

Basic MERN Authentication where a user can have many todos and a todo can have 1 author/user (1 to many relationships)

## Getting Started

### Installing Packages

Run `npm install` in the root of this folder. Once finished, cd into the `client` folder and run `npm install` again to install the client dependencies.

### Running App

cd back to the root of this folder and run `npm run dev` to run both `backend` and `client` at the same time with the package `concurrently`.

### Prerequisite

> #### SERVER:

Please make sure you have a `.env` file to store the following environmental variables:

```
PORT=
DATABASE=
JWT_SECRET=
GOOGLE_CLIENT_ID=
```

-   `PORT` represents the PORT on which your server is listening on
-   `DATABASE` represents the mongodb local or atlas URL, simple paste the string after the equal sign (=)
-   `JWT_SECRET` represents our 'secret' for JWT, this can be filled with anything. Simply smash your hand on the keyboard to fill out some random characters.
-   `GOOGLE_CLIENT_ID` represents the OAuth `Client ID` from Google. Please make sure your `Authorized JavaScript origins` and `Authorized redirect URIs` are the same.

> Example:

### Authorized JavaScript origins

```
http://localhost:3000
```

### Authorized redirect URIs

```
http://localhost:3000
```

> #### CLIENT:
>
> Please make sure you have a `.env` file to store the following enviromental variables:
> `NOTE:` Whenever using an `.env` file in your React application, you should always prefix the variable name with `REACT_APP`

```
REACT_APP_GOOGLE_CLIENT_ID=
REACT_APP_FACEBOOK_APP_ID=
```

-   `REACT_APP_GOOGLE_CLIENT_ID` represent the OAuth `Client ID`, grab this from your backend, it should be there too
-   `REACT_APP_FACEBOOK_APP_ID` represents your App ID for facebook auth. Like the Google Auth, please make sure origin and redirect URI's are the same

> 1: Register:
> You would first need to register as a user

> 2: Login:
> After registering, you can now successfully login.
> **After that is done you can login into your database and change the roles from subscriber to admin. To see the difference. As an admin yu can view all users in the database,number of tasks and cars sold . As admin you can give out tasks to a specific user using their email. As a normal user you can add cars your sold and check out your tasks**

_All passwords are hashed before being stored to add more security._
