package com.factored.excercise.services;

import com.factored.excercise.models.Employee;

/* Interface that Services class applies for the dependency injection */
public interface IServiceEmployee {
	
	Employee login(Employee employee);
	Employee getEmployee(Long id);
	void createEmployee(Employee employee);
}
