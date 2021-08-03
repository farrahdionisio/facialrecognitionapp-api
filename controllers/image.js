const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '2cdc953031ef487790ab3d38e0ddf365'
})

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('unable to work API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        console.log(entries);
        res.json(entries)
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}