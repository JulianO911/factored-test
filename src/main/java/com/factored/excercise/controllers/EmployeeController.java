package com.factored.excercise.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.factored.excercise.models.Employee;
import com.factored.excercise.services.ServiceEmployee;

@RestController
@RequestMapping("employee")
public class EmployeeController {
	
	@Autowired
	ServiceEmployee serviceEmployee;
	
	/* Request method for the login */
	@PostMapping("/login")
	public Employee login(@RequestBody Employee employee) {
		return serviceEmployee.login(employee);
	}
	/* Request method for get a employee by id */
	@GetMapping("/{id}")
	public Employee getEmployee(@PathVariable Long id) {
		return serviceEmployee.getEmployee(id);
	}
	/* Request method to create a employee */
	@PostMapping
	public void createEmployee(@RequestBody Employee employee) {
		serviceEmployee.createEmployee(employee);
	}
}
