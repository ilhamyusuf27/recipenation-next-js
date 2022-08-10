import axios from "axios";

export default function handler(req, res) {
	const { search } = req.query;
	// // console.log(JSON.parse(req.body));
	// console.log(req);

	axios
		.get(`${process.env.API_URL}/recipes/find/${search}`)
		.then((response) => {
			res.status(200).json(response?.data);
		})
		.catch((err) => {
			res.status(400).json(err.response.data);
		});
}
