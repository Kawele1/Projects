"use strict";
require('dotenv').config();

const  express  =  require('express');
const  bodyParser  =  require('body-parser');
const Pusher = require('pusher');

const  cors = require('cors')
const  sqlite3  =  require('sqlite3').verbose();
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs');

const database = new sqlite3.Database("./my.db");

const SECRET_KEY = "secretkey23456";

const  app  =  express();
const  router  =  express.Router();
app.use(cors())

const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.CLUSTER,
      encrypted: true,
    });

router.use(bodyParser.urlencoded({ extended:  false }));
router.use(bodyParser.json());

router.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
    });

const  createUsersTable  = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY,
		name text,
		sex text,
		ward text,
		province text,
        nrc text UNIQUE,
        password text)`;

    return  database.run(sqlQuery);
}

const  findUserByNRC  = (nrc, cb) => {
    return  database.get(`SELECT * FROM users WHERE nrc = ?`,[nrc], (err, row) => {
            cb(err, row)
    });
}

const  createUser  = (user, cb) => {
    return  database.run('INSERT INTO users (name, sex, ward, province, nrc, password) VALUES (?,?,?,?,?,?,?)',user, (err) => {
        cb(err)
    });
}

createUsersTable();

router.get('/', (req, res) => {
    res.status(200).send('This is an authentication server');
});

router.post('/register', (req, res) => {

    const  name  =  req.body.name;
    const  sex  =  req.body.sex;
    const  ward  =  req.body.ward;
    const  province  =  req.body.province;
    const  nrc  =  req.body.nrc;
    console.log(req.body);
    const  password  =  bcrypt.hashSync(req.body.password);

    createUser([name, sex, ward, province, nrc, password], (err)=>{
        if(err) return  res.status(500).send("Server error!");
        findUserByNRC(nrc, (err, user)=>{
            if (err) return  res.status(500).send('Server error!');  
            const  expiresIn  =  24  *  60  *  60;
            const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
                expiresIn:  expiresIn
            });
            res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn          
            });
        });
    });
});


router.post('/login', (req, res) => {
    const  nrc  =  req.body.nrc;
    const  password  =  req.body.password;
    findUserByNRC(nrc, (err, user)=>{
        if (err) return  res.status(500).send('Server error!');
        if (!user) return  res.status(404).send('User not found!');
        const  result  =  bcrypt.compareSync(password, user.password);
        if(!result) return  res.status(401).send('Password not valid!');

        const  expiresIn  =  24  *  60  *  60;
        const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
            expiresIn:  expiresIn
        });
        res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn});
    });
});

//send votes
app.post('/vote', (req, res) => {
      const { body } = req;
      const { player } = body;
      pusher.trigger('vote-channel', 'vote', {
        player,
      });
      res.json({ player });
    });
	
app.use(router);
const  port  =  process.env.PORT  ||  3000;
const  server  =  app.listen(port, () => {
    console.log('Server listening at http://localhost:'  +  port);
}); 