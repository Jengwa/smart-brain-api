const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'fdf29fb6b54441d99c1a326c90630098'
});

const handleApiCall = (req,res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('failed to fetch api'))
}

const handleImage = (req,res,db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
  .increment('entries',1)
  .returning('entries')
  .then(entries => {
  	res.json(entries);
  })
  .catch(err => res.status(400).json('failed'))
}
module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}