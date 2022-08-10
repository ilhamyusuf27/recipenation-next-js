import axios from "axios";

export default function handler(req, res) {
	const { email, password } = req.body;

	axios
		.post(`${process.env.API_URL}/login`, {
			email,
			password,
		})
		.then((response) => {
			res.status(200).json(response?.data);
		})
		.catch((err) => res.status(400).json(err.response.data));
}
