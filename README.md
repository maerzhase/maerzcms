# maerzcms
File-Based CMS written in Javascript / PHP; using yeoman generator with react-webpack

## yeoman-generator - grunt + webpack + react
this project uses yeoman with the react/webpack generator. for short instructions please visit: http://newtriks.com/2013/12/31/automating-react-with-yeoman-and-grunt/

the setup uses the ```webpack-dev-server``` for front-end and live-reload and is configured to use a back-end proxy on 127.0.0.1:8888
infos: http://webpack.github.io/docs/webpack-dev-server.html

to work on the project please start the webpack-dev-server with:
```grunt serve``` in the root directory.
run the backend server in src/ e.g. ```php -S 127.0.0.1:8888 -t .```

open http://localhost:8000 (front-end) to work. request are automatically forwarded to the back-end.


## login (-logic)

After quiet some research about single page authentication and login systems I decided to build the login-logic towards the user-experience. I didn't want any redirection to another url with the protected content, neither I wanted to call an ajax-request on every protected-action due to speed issues. 
I decided to keep it as basic as possible: On login the server provides a session and on client-side a global variable is set to know the current login-state of the user. Since we are not displaying any sensible data in the admin-mode, it is not a great concern that you may set this variable through console. so people may tell the client to get access to admin area (they can even edit the content on client side), but to save the changes you need to have a valid session, which is checked on server-side.

i am refering myself to this article: http://frederiknakstad.com/2013/01/21/authentication-in-single-page-applications-with-angular-js/
I am open for suggestions – i may even change this logic later on...

