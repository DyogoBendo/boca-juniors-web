import axios from 'axios'

const bocaJuniorsAPI = axios.create({
	baseURL: "http://localhost:8080/",
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',		
		'Access-Control-Expose-Headers': 'Content-Disposition',
	},
})

export default bocaJuniorsAPI
