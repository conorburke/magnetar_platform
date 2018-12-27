const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const db = require('../db');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

//user is what is passed back form the create/find user below
passport.serializeUser((user, done) => {
	//null indicates no error, second is user record
	done(null, user.id);
});

//deserialize the token, for us the user id
passport.deserializeUser((id, done) => {
	db.select()
		.from('users')
		.where({ id })
		.then(rows => {
			user = rows[0];
			done(null, user);
		});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('access token', accessToken);
			console.log('refresh token', refreshToken);
			console.log('profile', profile);

			db.select()
				.from('users')
				.where('google_id', profile.id)
				.then(rows => {
					console.log('rooooooows', rows);
					console.log('email', profile.emails);
					if (rows.length === 0) {
						db('users')
							.insert({
								google_id: profile.id,
								first_name: profile.name.givenName || '',
								last_name: profile.name.familyName || '',
								email: profile.emails[0] ? profile.emails[0].value : ''
							})
							.then(() => {
								db.select()
									.from('users')
									.where('google_id', profile.id)
									.then(rows => {
										console.log('rows again', rows);
										done(null, rows[0]);
									});
							});
					} else {
						done(null, rows[0]);
					}
				});
		}
	)
);
