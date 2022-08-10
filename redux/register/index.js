import * as Type from "./type";

const initialState = {
	name: "",
	email: "",
	phone_number: "",
	password: "",
	rePassword: "",
};

const reducer = (state = initialState, action) => {
	let { type, payload } = action;
	switch (type) {
		case Type.SET_NAME:
			return { ...state, name: payload.name };
		case Type.SET_EMAIL:
			return { ...state, email: payload.email };
		case Type.SET_PHONE:
			return { ...state, phone_number: payload.phone_number };
		case Type.SET_PASS:
			return { ...state, password: payload.password };
		case Type.SET_CONFPASS:
			return { ...state, rePassword: payload.rePassword };
		case Type.CLEAR:
			return { name: "", email: "", phone_number: "", password: "", rePassword: "" };
		default:
			return state;
	}
};

export default reducer;
export * from "./type";
