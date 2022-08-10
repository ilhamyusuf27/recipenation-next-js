import axios from "axios";

export default function handler(req, res) {
	const { name, email, phone_number, password, rePassword } = req.body;

	axios
		.post(`${process.env.API_URL}/registration`, {
			name,
			phone_number,
			email,
			password,
			rePassword,
		})
		.then((response) => {
			res.status(200).json(response?.data);
		})
		.catch((err) => res.status(400).json(err.response.data));
}
