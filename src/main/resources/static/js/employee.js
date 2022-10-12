$(document).ready(function() {
	loadEmployee(localStorage.id);
	$('#employee').DataTable();
});

/* Function that load a employee by id and show all the information after login */
async function loadEmployee(id){
  	const request = await fetch('employee/'+id, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.token
    },
  	});
  	
  	const employee = await request.json();
  	let employeeStr = '';
  	/* Generates a row for table and puts in the DOM */
	let employeeHtml = '<tr><td>'+employee.name+'</td><td>'+employee.position+'</td><td>'+employee.phoneNumber+
		'</td><td>'+employee.email;
	employeeStr += employeeHtml;
  	document.querySelector('#employee tbody').outerHTML = employeeStr;
  	document.querySelector('#avatarName').textContent = employee.name;
  	/* Gets the image element and set the source path for the avatar */
  	document.getElementById('avatar').src = employee.avatarURL;
  	/* Shows the spyder chart with skilss and levels*/
  	spyderChart(employee.skills.split(','),employee.levels.split(','));
}
/* Function that generates a json employee object when user clicks in the button register */
async function createEmployee(){
	let employee = {
		name: document.getElementById('name').value,
		position: document.getElementById('position').value,
		phoneNumber: document.getElementById('phone').value,
		email: document.getElementById('email').value,
		password: document.getElementById('password').value
	};
	/* If the user doesn't introduce any skill, system returns a error message */
	let skills = document.getElementById("skills").children;
	if(skills.length===1){
		alert("You need to introduce at least one skill");
		return;
	}
	let skillsStr = '';
	let levels = '';
	/* Iterates about the skill forms and the checkboxes elements and store the values in a string*/
	for(let skill=1;skill<skills.length;skill++){
		console.log(skills[skill].value);
		let checkbox = skills[skill].lastElementChild.children
		for(let check=0;check<checkbox.length;check++){
			/* Only stores if the box is checked */
			if(checkbox[check].firstElementChild.checked){
				levels += checkbox[check].firstElementChild.value;
				break;
			}
		}
		/* Concatenate all skills with comma (except the last one)*/
		if(skill===skills.length-1){
			skillsStr += skills[skill].firstElementChild.firstElementChild.value;
		}else{
			skillsStr += skills[skill].firstElementChild.firstElementChild.value+",";
			levels += ",";
		}
	}
	
	employee.skills = skillsStr;
	employee.levels = levels;
	
	/* If passwords don't match, system returns a message error */
	let confirmPassword = document.getElementById('confirmPassword').value;
	if (confirmPassword != employee.password){
		alert("The passwords don't match");
		return;
	}
	/* Make a post request for server to create the employee and store in DB*/
	const request = await fetch('employee', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  	});
  	alert("Employee created successfully")
  	window.location.href = 'login.html';
}

/* Function that generates a skill and checkboxex form if the user clicks the add skill button */
function skills(){
   /* Creates the div container that contains two other div containers */
   let divContainer1 = document.createElement('div');
   divContainer1.classList.add('form-group','row');
   /* Form for the current skill */
   let form = document.createElement('input');
   form.classList.add('form-control','form-control-user');
   form.type = 'text';
   form.placeholder = 'Your skill';
   /* Div that contains the form */
   let divContainer11 = document.createElement('div');
   divContainer11.classList.add('col-sm-6','mb-3','mb-sm-0');
   divContainer11.appendChild(form);
   /* Div that contains the checkboxes*/
   let divContainer12 = document.createElement('div');
   divContainer12.classList.add('col-sm-6');
   
   /* Generates the three checkboxes for the labels Low, High and Medium */
   let levelArray = ['Low','Medium','High'];
   for(let buttons=1;buttons<=3;buttons++){
		let label = document.createElement('label');
		let checkbox = document.createElement('input');
		checkbox.classList.add('radio');
		checkbox.type = 'checkbox';
		checkbox.value = levelArray[buttons-1];
		label.textContent = levelArray[buttons-1];
		label.appendChild(checkbox);
		divContainer12.appendChild(label);
	}
   divContainer1.appendChild(divContainer11);
   divContainer1.appendChild(divContainer12);
   document.getElementById('skills').appendChild(divContainer1)
}

/* Function that generates the spyder charts to show the skills and levels respectly */
function spyderChart(skills,levels){
	anychart.onDocumentReady(function(){
		let data = [];
		for(let skill=0;skill<skills.length;skill++){
			if(levels[skill]==="Low"){
				data.push({x:skills[skill],value:1});
			}else if(levels[skill]==="Medium"){
				data.push({x:skills[skill],value:2});
			}else{
				data.push({x:skills[skill],value:3});
			}
			
		}
		let chart = anychart.radar();
		
		chart.yScale()
        .minimum(1)
        .maximum(3)
        .ticks({'interval':1});
		
		chart.area(data).markers(true).fill("#E55934", 0.3).stroke("#E55934");
		
		chart.yGrid().palette(["gray 0.1", "gray 0.2"]);
		
		chart.title('Skills spyder chart \n\n 1. Low 2. Medium 3. High');
		
		chart.container('chartContainer')
		
		chart.draw();
	});
}
