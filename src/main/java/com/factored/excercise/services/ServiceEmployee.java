package com.factored.excercise.services;

import java.awt.Color;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.factored.excercise.models.Employee;
import com.factored.excercise.repositories.RepositoryEmployee;
import com.github.afkbrb.avatar.Avatar;
import com.github.afkbrb.avatar.AvatarConfig;

@Service
public class ServiceEmployee implements IServiceEmployee {
	
	@Autowired
	RepositoryEmployee repositoryEmployee;
 
	/* Login method that use the database query to get the employee by email and password */
	@Override
	public Employee login(Employee employee) {
		List<Employee> query = repositoryEmployee.findByEmailAndPassword(employee.getEmail(),employee.getPassword());
		/* If the query gets 0 results, the method returns null */
		if(query.size()==0) {
			return null;
		}
		return query.get(0);
	}

	/* Method that query an employee by id */
	@Override
	public Employee getEmployee(Long id) {
		return repositoryEmployee.getReferenceById(id);
	}

	@Override
	/* Method that create a employee row in the database and create an avatar */
	public void createEmployee(Employee employee) {
		/* Generates an avatar object and stores it in the img folder*/
		AvatarConfig config = new AvatarConfig();
		Color[] colors = {Color.BLUE,Color.GREEN,Color.RED,Color.YELLOW,Color.MAGENTA};
		config.setForeColor(colors[new Random().nextInt(colors.length)]);
		Avatar avatar = new Avatar(config);
		String generalPath = System.getProperty("user.dir");
		String path = "img/"+0+".png";
		avatar.saveAsPNG(generalPath+"/src/main/resources/static/"+path);
		employee.setAvatarURL(path);
		repositoryEmployee.save(employee);
		
	}
	

}
