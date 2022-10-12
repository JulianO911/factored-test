package com.factored.excercise.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.factored.excercise.models.Employee;

/* Repository that connects directly with the DB */
@Repository
public interface RepositoryEmployee extends JpaRepository<Employee, Long>{
	
	List<Employee> findByEmailAndPassword(String email, String password);
}
