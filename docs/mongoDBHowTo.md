## Mongodb

* open cmd window 
* copy paste the following command line

"c:\program files\MongoDB 2.6 Standard\bin\mongod" --dbpath C:\Dev\mongodb --repair
"c:\program files\MongoDB 2.6 Standard\bin\mongod" --dbpath C:\Dev\mongodb --rest

MongoDB commands lines:

//Start the mongo console

"c:\program files\MongoDB 2.6 Standard\bin\mongo"  

show dbs   //shows the database avaialable

use psJWT // switch to the good database

db.users.find()  // list documents of the users collection

db.users.remove({}); // remove all the documents in the collection users  

show collections


MongoDB administration tool

MongoVUE
