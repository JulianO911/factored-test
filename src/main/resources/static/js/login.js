/* Function that gets the email and password and verifies if an user with this information exist */
async function login(){
	let data = {
		email: document.getElementById('email').value,
		password: document.getElementById('password').value
	};
	const request = await fetch('employee/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  	});
  	
  	const response = await request.json();
  	if(response !=null){
		/* Stores information in sesion to load employee information later */
		localStorage.password = data.password;
		localStorage.email = data.email;
		localStorage.id = response.id
		window.location.href = 'employee.html';
	}
}