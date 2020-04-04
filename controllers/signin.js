const handleSignin = (req, res,db,bcrypt) =>{
	const { email , password } = req.body;
	if (!email || !password) {
		return res.status(400).json('must enter correct user')
	}
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash); 
		if (isValid) {
			return db.select('*').from('users')
			.where('email', '=', email)
			.then(user =>{
				res.json(user[0])
			})
			.catch(err => res.status(400).json('err wrong email or password'));
		} else {
			res.status(400).json('email or password dose not match')
		}
	})
		.catch(err => res.status(400).json('err wrong email or password'));
}
module.exports = {
	handleSignin: handleSignin
};