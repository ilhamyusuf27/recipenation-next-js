import axios from "axios";

export default function handler(req, res) {
	const { id } = req.query;
	const token = req?.headers?.authorization;
	console.log(id);

	axios
		.get(`${process.env.API_URL}/recipes/save/${id}`)
		.then((response) => {
			res.status(200).json(response?.data);
		})
		.catch((err) => {
			// console.log(err);
			res.status(400).json(err?.response?.data);
		});
}
