# Udagram Image Filtering Microservice From Jorge Herrera

##Notes

- I implemented authentication, but to make it easy to review in a browser, all calls are GET (this is not secure at all, but is just to show I understood that part of the course)
- You can still use POSTMAN too
- First, call /login?username=admin&password=admin and you will get the token (copy it)
- Then call /filteredimage?image_url={url}&token={copied token}
- EB URL: http://image-filter-894865937276-dev22.us-east-1.elasticbeanstalk.com/
