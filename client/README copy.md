## Deployment wiki
    • For Development Mode
            #In Front End directory (crio)
                Src/service/config/index.js
                export const config = {
                BASE_URL: 'http://127.0.0.1:8000/api/',
                }
                npm run build

                copy dist/js, css, img to frontend/beta/ of backend directory
                copy dist/index.html to frontend/ of backend directory

            #In Backend Directory
            
                npm run dev
                    • For Production Mode

           # FrontEnd

                Src/service/config/index.js
                export const config = {
                BASE_URL: 'https://my.crioon.com/api/',
                }
                npm run build
                copy dist/js, css, img to frontend/beta/ of backend directory
                copy dist/index.html to frontend/ of backend directory

            #Backend

                    .env file
                    MONGODB_URI=MONGODB_URI=mongodb://crio_mongo:27017/crio

            #Starting docker

                    docker-compose build
                    docker-compose up –d app

            #Database seed

                    https://my.crioon.com/api/createBaseDB
                    https://my.crioon.com/api/clearDB
                    // This function is defined in controllers/test.js 
                    // You must block this after you seed database!
                    routes/index.js
                    router.use('/', publicRouter);  // for test

                    After that, start docker again.

     •Production Mode

            You should environment variables for paypal and stripe for production. ( .env )