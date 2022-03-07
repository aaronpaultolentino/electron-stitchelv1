const login = require('./AuthLogin');

test('Login Test', () => {
	const email = 'pjcruz@gmail.com';
	const password = '123123123';

	  let loginData = {
              email: email,
              password: password,
          };
	expect(login(loginData)).toBe(true)
})
