
HTTP Verb       Path                Module Method       Description
GET             /users              index               Lists users
//GET             /users/new          new                 The form to create a newuser
POST            /users              create              Processes new user form submission
GET             /users/:id          show                Shows user with ID :id
//GET             /users/:id/edit     edit                Form to edit user with ID :id
PUT             /users/:id          update              Processes user edit form submission
DELETE          /users/:id          destroy             Deletes user with ID :id