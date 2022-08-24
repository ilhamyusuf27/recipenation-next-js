import axios from "axios";

export default function handler(req, res) {
	const { getuser } = req.query;

	axios
		.get(`${process.env.API_URL}/users/${getuser}`)
		.then((response) => {
			// console.log(response);
			res.status(200).json(response?.data);
		})
		.catch((err) => {
			res.status(400).json(err.response.data);
		});
}
