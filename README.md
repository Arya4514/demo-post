# Node Test

There wre two roles SUPER_ADMIN & USER(guest User). Admin can upload images. Other user can see all the images posted by admin.
User can signUp.

To start Demo make sure you have Node installed on your pc.

1 Clone the repo

```
git clone git@github.com:Arya4514/demo-post.git
cd demo-post
```   

2 Install all dependencies

```
npm install
```
3 There are 3 environments development, staging, production

```
npm run dev // to start development environment
npm run staging // to start staging environment
npm run start // to start production environment
```


In this test we have used node@14.0.0 and npm@6.14.4

* express
* bcryptjs
* fs-extra
* jsonwebtoken
* multer
* pg
* sequelize

### Sequelize

Sequelize is used to handle database connection and table creations

[sequelize](https://www.npmjs.com/package/sequelize)

### Password Encryption

 To store password encrypted bcryptjs was used.

[bcryptjs](https://www.npmjs.com/package/bcryptjs)


### Authorization

 We have used JWT authorization for authorization

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

### Image Uploading

 Image where stored in nodejs using multer middleware which handles the form data  

[multer](https://www.npmjs.com/package/multer)
