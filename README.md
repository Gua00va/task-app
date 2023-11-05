# task-app

POSTMAN URLs to run the api, 
set auth to bearer token and set the token as {{authToken}}
In Create User and Login routes set Test command as:

if(pm.response.code === 201(200 for Login)){
    pm.environment.set('authToken', pm.response.json().token) 
}

- Create User
  POST HOST/api/users 
  Pass name, email, password and age(not necessary) in thr request body
  
- Login  
  POST HOST/api/users/login
  Pass email and passwword in body
  
- Logout 
  POST HOST/api/users/logout  
  
- Logout All
  POST HOST/api/users/logoutall
 
- Create Task
  POST HOST/api/tasks 
  Pass description and completion status(true/false) in the request body
  
- Upload Avatar
  POST HOST/api/users/me/avatar
  Pass image in the request in the body
  
- Read Profile
  GET  HOST/api/users/me
  
- Read Task By id
  GET HOST/api/tasks/id  (pass the task-id inplace of 'id')
  
- Read All Tasks  
  GET HOST/api/tasks      (can use pagination by adding limit, skip in the query OR can sort the tasks by adding time)
  
- View Avatar
  GET HOST/api/users/id/avatar   (pass the user-id inplace of 'id')
  
- Update Profile  
  PATCH HOST/api/users/me
  Pass the update parameters in request body
  
- Update Task
  PATCH HOST/api/tasks/id (Pass task-id inplace of 'id')
  
- Delete Avatar
  DELETE HOST/api/users/me/avatar
  
- Delete Task
  DELETE HOST/api/tasks/id (Pass task-id inplace of 'id')
  
- Delete User
  DELETE HOST/api/users/me 
  
  
  



