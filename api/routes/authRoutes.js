const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const db = require('../db');

const handleSignin = (db, bcrypt) => (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}
	db.select('email', 'password_hash')
		.from('users')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].password_hash);
			if (isValid) {
				return db
					.select('*')
					.from('users')
					.where('email', '=', email)
					.then(user => {
						user = user[0];
						// initially only signed with the email
						user.token = jwt.sign(
							{ id: user.id, email },
							process.env.JWT_SECRET
						);
						// return res.json(user[0]);
						return res.json({ token: user.token, id: user.id });
					})
					.catch(err => res.status(400).json('unable to get user'));
			} else {
				res.status(400).json('wrong credentials');
			}
		})
		.catch(err => res.status(400).json('wrong credentials'));
};

const handleRegister = (req, res, db, bcrypt) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res
			.status(400)
			.json(`incorrect form submission ${email}  ${password}`);
	}
	const password_hash = bcrypt.hashSync(password);

	db.transaction(trx => {
		trx
			.insert({
				password_hash: password_hash,
				email: email
			})
			.into('users')
			.then(trx.commit)
			.catch(trx.rollback);
	})
		.then(() => {
			db.select()
				.from('users')
				.where({ email })
				.then(response => {
					// initially only signed with the email
					response[0].token = jwt.sign(
						{ id: response[0].id, email },
						process.env.JWT_SECRET
					);
					// return res.status(200).json(response[0]);
					return res
						.status(200)
						.json({ token: response[0].token, id: response[0].id });
				});
		})
		.catch(() =>
			res
				.status(400)
				.json(`unable to register.  do you already have an account?`)
		);
};

const verifyToken = (req, res) => {
	const { authorization } = req.headers;
	jwt.verify(authorization, process.env.JWT_SECRET, err => {
		if (!err) {
			res.status(200).send('authorized');
		} else {
			res.status(401).send('unauthorized');
		}
	});
};

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'],
			prompt: 'select_account'
		})
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/tools');
		}
	);

	app.get('/api/logout', (req, res) => {
		//kills cookie
		req.session = null;
		// res.send(req.user);
		console.log('goodbye!');
		res.cookie('express:sess', '', { expires: new Date() });
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});

	app.post('/signin', handleSignin(db, bcrypt));
	app.post('/register', (req, res) => {
		handleRegister(req, res, db, bcrypt);
	});
	app.post('/verify', (req, res) => {
		verifyToken(req, res);
	});
};
