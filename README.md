# Udagram Image Filtering Microservice From Jorge Herrera

##Notes

- Create an .env file in the root of the project with the environment variable JWT_SECRET=anyvalue
- I implemented authentication, but to make it easy to review in a browser, all calls are GET (this is not secure at all, but is just to show I understood that part of the course)
- You can still use POSTMAN too
- First, call /login?username=admin&password=admin and you will get the token (copy it)
- Then call /filteredimage?image_url={url}&token={copied token}
- EB URL: http://image-filter-894865937276-dev22.us-east-1.elasticbeanstalk.com/
- EB Deployed application in root project (eb_screenshot.png)
