# backend server
- API (REST API)

## representational stateless transfer
 - REST API
    - methods -> get, post, put, patch, delete
    - url

## folder architecture
   ''' text
   /src
      /controllers
      /models
      /routers
      /services
      ...


   OR

moduler architecture
   /src
      /modules
      /<features>
      /auth
         auth.controller.ts
         auth.services.ts
         auth.router.ts
         auth.modle.ts
         ...



## middleware
-In the MERN stack, middleware is a function (or series of functions) in the backend (Express.js/Node.js) that intercepts the HTTP request-response cycle to perform specific actions before the request reaches the final route handler. It functions as a "software glue" connecting different parts of the application and enforcing consistent logic across routes. 

Request
  ↓
[ middleware 1 ] → next()
  ↓
[ middleware 2 ] → next()
  ↓
[ router ]
  ↓
Response

- Every request passes through middleware functions before a response is sent.
Middleware handles:
  parsing data
  checking auth
  routing
  error handling
middleware is the bridge logic between client and server behavior.
But:
Middleware is server-side only

## multer
 - third party middleware
 - file handling

Client uploads image
 ↓
Multer reads multipart/form-data
 ↓
Multer Storage sends file to Cloudinary
 ↓
Cloudinary stores file
 ↓
Cloudinary returns URL
 ↓
URL is available in req.file.path


## dotenv
dotenv is a library that:
Reads variables from a .env file and puts them into process.env


## cloudinary and multer

multer runs first
controller runs second
multer() returns a middleware that processes file uploads. When used with multer-storage-cloudinary, files are uploaded directly to Cloudinary instead of local disk. Uploaded file information is attached to req.file, which contains the Cloudinary URL (path) and public identifier (filename). Cloudinary transformations generate optimized image URLs without modifying the original file.

##mongoose
- database configuration provider





//chat api
  //send message
  //list
  //update
  //delete
  //socet integration