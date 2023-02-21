import pkg from 'yup';
const { object, string, number, date, InferType } = pkg;

let schema = object({
	name: string().required(),
	age: number().required().positive().integer(),
	email: string().email()
});

let user1 = { name: '', age: -10, email: 'a' };
let user2 = { name: 'A', age: 15, email: 'a@gmail.com' };

// parse and assert validity
try {
	// `abortEarly: false` to get all the errors
	await schema.validate(user1, { abortEarly: false });
	console.log(JSON.stringify(user1, null, 2));
	errors = {};
} catch (err) {
	console.log(err.errors);
}
