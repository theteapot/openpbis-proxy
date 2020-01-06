const express = require('express')
const app = express()
const { exec } = require('child_process')

const PORT = 3000

const json = (req, res) => {
	var data = "";
	req.on('data', (chunk) => { data += chunk})
	req.on('end', () => {
 	       req.rawBody = data;
        	req.jsonBody = JSON.parse(data);
	        next();
	})
}

// app.use(json)

app.get('/', (req, res, next) => {
	const { command } = req.query
	exec(command, (err, stdout, stderr) => {
		if (err) { 
			console.log('err', err)
			res.status(400).send(err)
		} else if (stderr) {
			console.log('stderr', err)
			res.status(400).send(stderr)
		} else if (stdout) {
			console.log('stdout', stdout)
			res.send(stdout)
		} else {
			res.status(500).send("Server error")
		}	
	})
})

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})



