# Flask React Project

This is the starter for the Flask React project.

## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the __.css__ files from your
   Authenticate Me project into the corresponding locations in the
   __react-vite__ folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.

## Deployment through Render.com

First, recall that Vite is a development dependency, so it will not be used in
production. This means that you must already have the __dist__ folder located in
the root of your __react-vite__ folder when you push to GitHub. This __dist__
folder contains your React code and all necessary dependencies minified and
bundled into a smaller footprint, ready to be served from your Python API.

Begin deployment by running `npm run build` in your __react-vite__ folder and
pushing any changes to GitHub.

Refer to your Render.com deployment articles for more detailed instructions
about getting started with [Render.com], creating a production database, and
deployment debugging tips.

From the Render [Dashboard], click on the "New +" button in the navigation bar,
and click on "Web Service" to create the application that will be deployed.

Select that you want to "Build and deploy from a Git repository" and click
"Next". On the next page, find the name of the application repo you want to
deploy and click the "Connect" button to the right of the name.

Now you need to fill out the form to configure your app. Most of the setup will
be handled by the __Dockerfile__, but you do need to fill in a few fields.

Start by giving your application a name.

Make sure the Region is set to the location closest to you, the Branch is set to
"main", and Runtime is set to "Docker". You can leave the Root Directory field
blank. (By default, Render will run commands from the root directory.)

Select "Free" as your Instance Type.

### Add environment variables

In the development environment, you have been securing your environment
variables in a __.env__ file, which has been removed from source control (i.e.,
the file is gitignored). In this step, you will need to input the keys and
values for the environment variables you need for production into the Render
GUI.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from the **External Database URL** field)

**Note:** Add any other keys and values that may be present in your local
__.env__ file. As you work to further develop your project, you may need to add
more environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment.

### Deploy

Now you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your Dockerfile
commands being executed and any errors that occur.

When deployment is complete, open your deployed site and check to see that you
have successfully deployed your Flask application to Render! You can find the
URL for your site just below the name of the Web Service at the top of the page.

**Note:** By default, Render will set Auto-Deploy for your project to true. This
setting will cause Render to re-deploy your application every time you push to
main, always keeping it up to date.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/


## Pokedex Schema Design

![alt text](image.png)

## API Documentation

## USER / ADMIN AUTHENTICATION OR AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current admin to be logged in

- Request: endpoints that require authentication
- Error Response: Require authentication

   - Status Code: 401
   - Headers:
      -content-Type: application/json
   -Body:

   ```json
   {
      "message": "Unauthorized. Admin privileges required."
   }


### All endpoints that require proper authorization

All endpoints that require authentication and the current user foes not have the correct role or permissions

- Request: endpoints that require proper authorization
- Error Response: Require authorization

   - Status Code: 403
   - Headers:
      - Content-Type: application/json
   -Body:

      ```json
      {
         "message": "Unauthorized"
      }
      ```



## AUTH ROUTES

### Get the Current User

Returns all details of the user that is currently logged in

- Require Authentication: false
- Request:

   - Method: GET
   - Route path: /api/auth/session
   - Body: none

- Successful Response when there is user logged in

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:
   
      ```json
      {
         "user": {
            "id": 2,
            "username": "demo",
            "email": "demo@example.com",
            "fname": "Demo",
            "lname": "User",
            "admin": false,
            "profile_picture": "example.jpg",
            "pokemon_collection": [],
            "journal_entries": [],
            "comments": [],
            "likes": 1,
            "sent_messages": [],
            "received_messages": []
         }
      }
      ```

- Successful Response when there is an admin logged in

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:
   
      ```json
      {
         "user": {
            "id": 2,
            "username": "admin",
            "email": "admin@example.com",
            "fname": "Admin",
            "lname": "User",
            "admin": true,
            "profile_picture": "example.jpg",
            "pokemon_collection": [],
            "journal_entries": [],
            "comments": [],
            "likes": 1,
            "sent_messages": [],
            "received_messages": []
         }
      }
      ```

- Successful response when there is no user logged in

   - Status Code: 200
   - Headers:
      - Content-Type: application.json
   -Body:

      ```json
      {
         "errors": {
            "message": "Unauthorized"
         }
      }
      ```


### Log In a User

Logs in a user with valid credentials and returns the current user's details

- Require Authentication: false
- Request

   - Method: POST
   - Route path: /api/auth/login
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "credentials": "demo@example.com",
         "password": "secret password"
      }
      ```

- Successful Response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:
   
      ```json
      {
         "user": {
            "id": 2,
            "username": "demo",
            "email": "demo@example.com",
            "fname": "Demo",
            "lname": "User",
            "admin": false,
            "profile_picture": "example.jpg",
            "pokemon_collection": [],
            "journal_entries": [],
            "comments": [],
            "likes": 1,
            "sent_messages": [],
            "received_messages": []
         }
      }
      ```

- Error Response: Invalid credentials

   - Status Code: 401
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
      "message": "Invalid credentials"
      }
      ```

- Error response: Body validation errors

   - Status Code: 400
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "message": "Bad Request",
         "errors": {
            "credential": "Email or username is required",
            "password": "Password is required"
         }
      }
      ```


### Sign Up a User

Creates a new user, logs them in as the current user, and returns their user details

- Require Authentication: false
- Request

   - Method: POST
   - Route path: /api/auth/signup
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "username": "demo2",
         "email": "demo2@example.com",
         "password": "secret password",
         "fname": "Demo",
         "lname": "User",
         "admin": false,  // true if admin
         "profile_picture": "example.jpg"
      }
      ```

- Successful Response

   - Status Code: 201
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "user": {
            "id": 2,
            "username": "demo2",
            "email": "demo2@example.com",
            "fname": "Demo",
            "lname": "User",
            "admin": false,
            "profile_picture": "example.jpg",
            "pokemon_collection": [],
            "journal_entries": [],
            "comments": [],
            "likes": 1,
            "sent_messages": [],
            "received_messages": []
         }
      }
      ```

- Error response: if user already exists with the specified email or username

   - Status Code: 500
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "message": "User already exists",
         "errors": {
            "email": "Email address is already in use",
            "username": "Username is already in use"
         }
      }
      ```

- Error response: Body validation errors

   - Status Code: 400
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "message": "Bad Request",
         "errors": {
            "email": "Invalid email address",
            "username": "This field is required",
            "password": "Password is required",
            "fname": "First Name is required",
            "lname": "Last Name is required",
         }
      }
      ```


### Logout a User

Logs out the current user

- Require Authentication: false
- Request

   - Method: GET
   - Route path: /api/auth/logout
   - Headers:
      - Content-Type: application/json
   - Body: None

- Successful Response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "message": "User logged out"
      }
      ```


### Get User Account Details

Retrieves the account data of the current user

- Require Authentication: false
- Require Authorization: true
- Request

   - Method: GET
   - Route path: /api/auth/account
   - Headers:
      - Content-Type: application/json
   - Body: None

- Successful Response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "user": {
            "admin": false,
            "comments": [],
            "email": "demo@example.com",
            "fname": "Demo",
            "id": 2,
            "journal_entries": [],
            "lname": "User",
            "pokemon_collection": [],
            "profile_picture": "example.jpg",
            "received_messages": [],
            "sent_messages": [],
            "username": "demo"
         }
      }
      ```

- Error Response: Unauthorized


### Update User Account

Allows the user to update their account information

- Require Authentication: false
- Require Authorization: true
- Request

   - Method: PUT
   - Route path: /api/auth/account
   - Headers:
      - Content-Type: application/json
   - Body: 

      ```json
      {
         "username": "username",
         "email": "email",
         "fname": "fname",
         "lname": "lname",
         "profile_picture": "example.jpg"
      }
      ```

- Successful Response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "message": "Account updated successfully",
            "user": {
            "admin": false,
            "comments": [],
            "email": "email",
            "fname": "fname",
            "id": 3,
            "journal_entries": [],
            "lname": "lname",
            "pokemon_collection": [],
            "profile_picture": "",
            "received_messages": [],
            "sent_messages": [],
            "username": "username"
         }
      }
      ```

- Error response: Body validation errors

   - Status Code: 400
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "message": "Bad Request",
         "errors": {
            "email": "Invalid email address",
         }
      }
      ```

- Error Response: Unauthorized


### Delete User Account

Allows the current user to delete their own account

- Require Authentication: false
- Require Authorization: true
- Request

   - Method: DELETE
   - Route path: /api/auth/account
   - Headers:
      - Content-Type: application/json
   - Body: None

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "message": "Account deleted successfully"
      }
      ```

- Error Response: Unauthorized


### Admin Delete User Account

If the current user's admin property is TRUE, the admin can remove any user's account

- Require Authentication: true
- Require Authorization: true
- Request

   - Method: DELETE
   - Route path: /api/auth/account/:id
   - Headers:
      - Content-Type: application/json
   - Body: None

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "message": "User account with ID 6 has been deleted successfully."
      }
      ```

- Error response: Authentication required



## USER ROUTES

### Admin Get all Users

If the current user's admin property is TRUE, the admin can view details of all user accounts

- Require Authentication: true
- Require Authorization: true
- Request

   - Method: GET
   - Route path: /api/users
   - Headers:
      - Content-Type: application/json
   - Body: None

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "users": [
            {
               "user": {
                  "admin": true,
                  "comments": [],
                  "email": "admin@example.com",
                  "fname": "Admin",
                  "id": 1,
                  "journal_entries": [],
                  "lname": "User",
                  "pokemon_collection": [],
                  "profile_picture": null,
                  "received_messages": [],
                  "sent_messages": [],
                  "username": "admin"
               }
            }
         ]
      }
      ```

- Error response: Authentication required


### Admin Get User by ID

If the current user's admin property is TRUE, the admin can view details of any user's account

- Require Authentication: true
- Require Authorization: true
- Request

   - Method: GET
   - Route path: /api/users/:id
   - Headers:
      - Content-Type: application/json
   - Body: None

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "user": {
            "admin": false,
            "comments": [],
            "email": "demo@example.com",
            "fname": "Demo",
            "id": 2,
            "journal_entries": [],
            "lname": "User",
            "pokemon_collection": [],
            "profile_picture": "",
            "received_messages": [],
            "sent_messages": [],
            "username": "demouser"
         }
      }
      ```

- Error response: Authentication required


### Get User Profile

Returns the public profile of a user by user ID

- Require Authentication: false
- Require Authorization: false
- Request

   - Method: GET
   - Route path: /api/users/:id/profile
   - Headers:
      - Content-Type: application/json
   - Body: None

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "fname": "Demo",
         "id": 2,
         "journal_entries": [],
         "lname": "User",
         "pokemon_collection": [],
         "profile_picture": "example.jpg",
         "username": "demouser"
      }
      ```



## POKEMON ROUTES

## Get all Pokemon

Return all the Pokemon

- Require Authentication: false
- Request

   - Method: GET
   - Route path: /api/pokemon
   - Body: None

- Successful Response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "Pokemon": [
            {
               "id": 1,
               "image": "example.jpg",
               "name": "Bulbasaur",
               "stats": [],
               "types": [
                  "Grass",
                  "Poison"
               ],
            }
         ]
      }
      ```


### Get Pokemon by ID

Returns the details of a pokemon by pokemon id

- Require Authentication: false
- Request

   - Method: GET
   - Route path: /api/pokemon/:id
   - Body: None

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "id": 1,
         "image": "example.jpg",
         "name": "Bulbasaur",
         "stats": [
            {
               "stat_name": "hp",
               "stat_value": 45
            },
            {
               "stat_name": "attack",
               "stat_value": 49
            },
            {
               "stat_name": "defense",
               "stat_value": 49
            },
            {
               "stat_name": "speed",
               "stat_value": 45
            }
         ],
         "types": [
            "Grass",
            "Poison"
         ]
      }
      ```

- Error response: Not found

   - Status Code: 404
   - Headers:
      - Content-Type: application/json
   -Body:

      ```json
      {
         "message": "Pokemon not found"
      }
      ```


### Add Pokemon to User Collection

Adds a pokemon to the current user's pokemon collection

- Require Authentication: false
- Require Authorization: true
- Request

   - Method: POST
   - Route path: /api/pokemon/:id
   - Body: None

- Successful response

   - Status Code: 201
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "message": "Pokemon added to your collection"
      }
      ```

- Error Response: Unauthorized


### Search Pokemon by ID or name query

Searches for pokemon based on the user's search query. The query will accept pokemon ID and pokemon name (or the first characters of a pokemon's name) and return all results that match the query

- Require Authentication: false
- Request

   - Method: GET
   - Route path: /api/pokemon/search?query=(id or name)
   - Body: None

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "Pokemon": [
            {
               "id": 2,
               "image": "",
               "name": "Ivysaur",
               "stats": [
                  {
                     "stat_name": "hp",
                     "stat_value": 60
                  },
                  {
                     "stat_name": "attack",
                     "stat_value": 62
                  },
                  {
                     "stat_name": "defense",
                     "stat_value": 63
                  },
                  {
                     "stat_name": "speed",
                     "stat_value": 60
                  }
               ],
               "types": [
                  "Grass",
                  "Poison"
               ]
            }
         ]
      }
      ```

- Error response: Not found

   - Status Code: 404
   - Headers:
      - Content-Type: application/json
   -Body:

      ```json
      {
         "message": "Pokemon not found"
      }
      ```


### Get User Pokemon Collection

Returns the current user's collection of pokemon

- Require Authentication: false
- Require Authorization: true
- Request

   - Method: GET
   - Route path: /api/pokemon/collection
   - Body: None

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "pokemon_collection": [
            {
               "custom_moves": null,
               "id": 1,
               "level": 1,
               "nickname": "nickname",
               "pokemon": {
                  "id": 2,
                  "image": "example.jpg",
                  "name": "Ivysaur",
                  "stats": [
                     {
                        "stat_name": "hp",
                        "stat_value": 60
                     },
                     {
                        "stat_name": "attack",
                        "stat_value": 800
                     },
                     {
                        "stat_name": "defense",
                        "stat_value": 63
                     },
                     {
                        "stat_name": "speed",
                        "stat_value": 60
                     }
                  ],
                  "types": [
                     "Grass",
                     "Poison"
                  ]
               },
               "pokemon_id": 2,
               "user_id": 3
            }
         ]
      }
      ```

- Error Response: Unauthorized



### Get Instances of Pokemon in User Collection by Pokemon ID

Returns all instances of a pokemon which appear in the current user's pokemon collection

- Require Authentication: false
- Require Authorization: true
- Request

   - Method: GET
   - Route path: /api/pokemon/collection/:id
   - Body: None

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "pokemon_instances": [
            {
               "collection_id": 1,
               "index": 1,
               "pokemon_data": {
                  "custom_moves": null,
                  "id": 1,
                  "level": 1,
                  "nickname": null,
                  "pokemon": {
                     "id": 2,
                     "image": "example.jpg",
                     "name": "Ivysaur",
                     "stats": [
                        {
                           "stat_name": "hp",
                           "stat_value": 60
                        },
                        {
                           "stat_name": "attack",
                           "stat_value": 62
                        },
                        {
                           "stat_name": "defense",
                           "stat_value": 63
                        },
                        {
                           "stat_name": "speed",
                           "stat_value": 60
                        }
                     ],
                     "types": [
                        "Grass",
                        "Poison"
                     ]
                  },
                  "pokemon_id": 2,
                  "user_id": 3
               },
               "pokemon_id": 2
            },
         ]
      }
      ```

- Error Response: Unauthorized


### Update User Pokemon

Allows the current user to update a pokemon in their collection by collection id

- Require Authentication: false
- Require Authorization: true
- Request

   - Method: PUT
   - Route path: /api/pokemon/collection/:id
   - Body: 

      ```json
      {
         "nickname": "nickname",
         "level": 90,
         "stats": [
            {
               "stat_name": "hp",
               "stat_value": 60
            },
            {
               "stat_name": "attack",
               "stat_value": 80
            }
         ]
      }
      ```

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "message": "Pokémon updated successfully",
         "pokemon": {
            "custom_moves": null,
            "id": 1,
            "level": 90,
            "nickname": "nickname",
            "pokemon": {
               "id": 2,
               "image": "example.jpg",
               "name": "Ivysaur",
               "stats": [
                  {
                     "stat_name": "hp",
                     "stat_value": 60
                  },
                  {
                     "stat_name": "attack",
                     "stat_value": 800
                  },
                  {
                     "stat_name": "defense",
                     "stat_value": 63
                  },
                  {
                     "stat_name": "speed",
                     "stat_value": 60
                  }
               ],
               "types": [
                  "Grass",
                  "Poison"
               ]
            },
            "pokemon_id": 2,
            "user_id": 3
         }
      }
      ```

- Error Response: Unauthorized


### Delete User Pokemon

Allows the current user to delete a pokemon from their collection by collection id

- Require Authentication: false
- Require Authorization: true
- Request

   - Method: PUT
   - Route path: /api/pokemon/collection/:id
   - Body: None

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "message": "Pokémon successfully removed from your collection"
      }
      ```

- Error response: not found

   - Status Code: 404
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "error": "Pokémon not found in your collection"
      }
      ```

- Error Response: Unauthorized



## JOURNAL ROUTES

### Get User Journal

Returns the current user's Journal

- Require Authentication: false
- Require Authorization: true
- Request

   - Method: GET
   - Route path: /api/journal
   - Body: None

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         [
            {
               "accomplishments": "",
               "comments": [],
               "content": "journal entry content",
               "id": 1,
               "like_count": 0,
               "mood": "Content",
               "photo_url": "",
               "timestamp": "current timestamp",
               "user_id": 2,
               "weather": "Cloudy"
            }
         ]
      }
      ```

- Error Response: Unauthorized


### Post Journal Entry

Posts an entry to the current user's Journal

- Require Authentication: false
- Require Authorization: true
- Request

   - Method: POST
   - Route path: /api/journal
   - Body:

      ```json
      {
         "content": "journal entry content",
         "accomplishments": "accomplishments",
         "weather": "Rainy",
         "mood": "Happy",
         "date": "YYYY-MM-DD",
         "photo_url": "example.jpg"
      }
      ```

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "accomplishments": "accomplishments",
         "comments": [],
         "content": "journal entry content",
         "id": 2,
         "like_count": 0,
         "mood": "Happy",
         "photo_url": null,
         "timestamp": "YYYY-MM-DD",
         "user_id": 2,
         "weather": "Rainy"
      }
      ```

- Error response: Body validation errors

   - Status Code: 400
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "message": "Bad Request",
         "errors": {
            "content": "Journal entry content is required"
         }
      }
      ```

- Error Response: Unauthorized


### Get Journal Entry by ID

Returns the current user's journal entry base on entry ID

- Require Authentication: false
- Require Authorization: true
- Request

   - Method: POST
   - Route path: /api/journal/1
   - Body: None

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "accomplishments": "accomplishments",
         "comments": [],
         "content": "journal entry content",
         "id": 1,
         "like_count": 0,
         "mood": "Content",
         "photo_url": null,
         "timestamp": "YYYY-MM-DD",
         "user_id": 2,
         "weather": "Cloudy"
      }
      ```

Error Response: Unauthorized


### Update Journal Entry

Allows the current user to edit a journal entry by entry ID

- Require Authentication: false
- Require Authorization: true
- Request

   - Method: PUT
   - Route path: /api/journal/:id
   - Body:

      ```json
      {
         "content": "journal entry content",
         "accomplishments": "accomplishments",
         "weather": "Rainy",
         "mood": "Happy",
         "date": "YYYY-MM-DD",
         "photo_url": "example.jpg"
      }
      ```

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "journal_entry": {
            "accomplishments": "accomplishments",
            "comments": [],
            "content": "journal entry content",
            "id": 2,
            "like_count": 0,
            "mood": "Happy",
            "photo_url": null,
            "timestamp": "YYYY-MM-DD",
            "user_id": 2,
            "weather": "Rainy"
         },
         "message": "Journal entry updated successfully",
      }
      ```

- Error response: Not found

   - Status Code: 404
   - Headers:
      - Content-Type: application/json
   -Body:

      ```json
      {
         "message": "Journal entry not found"
      }
      ```

- Error response: Body validation errors

   - Status Code: 400
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "message": "Bad Request",
         "errors": {
            "content": "Journal entry content is required"
         }
      }
      ```

- Error Response: Unauthorized


### Delete Journal Entry

Allows the current user to delete a journal entry by entry ID

- Require Authentication: false
- Require Authorization: true
- Request

   - Method: DELETE
   - Route path: /api/journal/:id
   - Body: None

- Successful response

   - Status Code: 200
   - Headers:
      - Content-Type: application/json
   - Body:

      ```json
      {
         "message": "Journal entry successfully deleted"
      }
      ```

- Error response: Not found

   - Status Code: 404
   - Headers:
      - Content-Type: application/json
   -Body:

      ```json
      {
         "message": "Pokemon not found"
      }
      ```

- Error Response: Unauthorized