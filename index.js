const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const Ddos = require('ddos')
const compression = require('compression')
const ddos = new Ddos
require('dotenv').config({ path: __dirname + '/.env' })

const port = process.env.PORT || 3000;

const app = express();
const path = require('path');

const { logData } = require('./src/helpers/common')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (process.env.APP_ENV == 'production') {

    const CronJob = require('cron').CronJob

    const { transactionStatus, mechanicStatus } = require('./src/crons/allCrons')


    //const job = new CronJob('0 */2 * * * *', () => transactionStatus())

    const job = new CronJob('*/10 * * * * *', () => mechanicStatus())

    job.start()
}

app.use(compression())
app.use(ddos.express)
app.use(helmet()); 		                                // adding Helmet to enhance your API's security

const corsOptions = {
    credentials: true,
    // exposedHeaders: 'aut_sess_tok',
    maxAge: 86400,                                       // preflight requests will be cached for 1 day
    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin || origin === 'null') return callback(null, true);
        if (process.env.CORS_DOMAINS.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}

app.use(cors(corsOptions)); 		                                // enabling CORS for all requests

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());                                            // can access cookie

app.get('/', (req, res) => res.send('Welcome To Mechanic Apis'))

//const authentication = require('./src/middlewares/authentication')
//app.use(authentication)

const routes = require('./src/routes/appRoutes');                       //importing route
app.use('/', routes);

app.listen(port, () => { console.log('listening on port ' + port) });
