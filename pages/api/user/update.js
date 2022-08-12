import axios from "axios";

export default function handler(req, res) {
	const formData = req.body;
	const token = req?.headers?.authorization;
	// console.log(JSON.parse(formData));
	console.log(req.file);
	console.log(req);

	axios
		.patch(`${process.env.API_URL}/users/update`, formData, {
			headers: {
				authorization: token,
				"Content-type": "multipart/form-data",
			},
		})
		.then((response) => {
			res.status(200).json(response?.data);
		})
		.catch((err) => {
			res.status(400).json(err.response.data);
		});
}
