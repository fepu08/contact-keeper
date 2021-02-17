# Contact List
**Full stack MERN app for manage your contacts.**
You can check the hosted app at https://secret-forest-09001.herokuapp.com/

### Need to add config files in *./config* directory
* For developement: *default.json*
* For production: *production.json*

Both files have to contain the fields below
* mongoURI
* jwtSecret 
* jwtTokenExpireTime

For example:
```json
{
  "mongoURI": "ADD_YOUR_CONNECTION_LINK_TO_MONGODB",
  "jwtSecret": "ADD_YOUR_JWT_SECRET_OF_YOUR_CHOOSE",
  "jwtTokenExpireTime": 3600
}
```
