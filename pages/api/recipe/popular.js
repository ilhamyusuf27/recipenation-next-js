import axios from "axios";

export default function handler(req, res) {
	axios
		.get(`${process.env.API_URL}/recipes/popular`)
		.then((response) => {
			// console.log(response);
			res.status(200).json(response?.data);
		})
		.catch((err) => {
			// console.log(err);
			res.status(400).json(err.response.data);
		});
}
