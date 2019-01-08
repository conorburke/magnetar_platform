require('dotenv').config();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const passport = require('passport');
const cors = require('cors');

// const db = require('./db');
const schema = require('./schema');

require('./services/passport');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(
	'/oracle',
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === 'production' ? false : true
	})
);

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});

app.use(
	cookieSession({
		maxAge: 1000 * 60 * 60 * 24 * 30,
		keys: [`${process.env.COOKIE_KEY}`]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/paymentRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	//express will serve up production assets
	app.use(express.static('client/build'));

	//express will serve up index.html if it doesn't recognize route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
