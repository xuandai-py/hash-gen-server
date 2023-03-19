const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const cors = require('cors')



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

let port = 3333

app.listen(port, () => {
	console.log('Server is running on port: ', port)
})
app.get('/guten', (req, res) => {
	res.status(200).json('guten tag')
})

app.post('/hash-input', async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(req.body.round);
		const result = await bcrypt.hash(req.body.inputData, salt);
		return res.status(200).json({ "result": result, "round": req.body.round })
	} catch (error) {
		console.error(error);
		return res.status(500).json("Something might wrong here!!!")

	}
})

app.post('/compare-input', async (req, res) => {
	try {
		const result = await bcrypt.compare(req.body.inputData, req.body.hashedData);
		return res.status(200).json({ "result": result })
	} catch (error) {
		console.error(error);
		return res.status(500).json("Something might wrong here!!!")
	}
})

