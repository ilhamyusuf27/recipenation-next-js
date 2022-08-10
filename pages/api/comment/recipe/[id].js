import axios from "axios";

export default function handler(req, res) {
	const { id } = req.query;
	// const token = req?.headers?.authorization;

	axios
		.get(`${process.env.API_URL}/get-comment/${id}`)
		.then((response) => {
			// console.log(response);
			res.status(200).json(response?.data);
		})
		.catch((err) => {
			res.status(400).json(err.response.data);
		});
}
