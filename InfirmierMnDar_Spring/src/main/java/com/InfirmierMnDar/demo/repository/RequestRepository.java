package com.InfirmierMnDar.demo.repository;

import com.InfirmierMnDar.demo.entity.Request;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
	List<Request> findByInfirmierId(int infirmierId);
}
