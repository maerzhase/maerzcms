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
