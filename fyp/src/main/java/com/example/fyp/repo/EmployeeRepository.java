package com.example.fyp.repo;

import com.example.fyp.entity.Employee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

    @Query("SELECT e.employeeName FROM Employee e WHERE e.employeeId = :employeeId")
    String findEmployeeNameById(Integer employeeId);

    @Query("SELECT e.employeeId, e.employeeName FROM Employee e")
    List<Object[]> findAllEmployeeName();

    @Query("SELECT e.employeeName, e.numPositiveSentiment, e.numNegativeSentiment FROM Employee e ORDER BY e.numPositiveSentiment DESC LIMIT 5")
    List<Object[]> findTop5EmployeesByPositiveSentiment();

    @Query("SELECT e.employeeName, e.numPositiveSentiment, e.numNegativeSentiment FROM Employee e ORDER BY e.numNegativeSentiment DESC LIMIT 5")
    List<Object[]> findTop5EmployeesByNegativeSentiment();

    @Query("SELECT e.numPositiveSentiment, e.numNegativeSentiment FROM Employee e WHERE e.employeeId = :employeeId")
    Object[] findEmployeeSentimentById(Integer employeeId);

}
