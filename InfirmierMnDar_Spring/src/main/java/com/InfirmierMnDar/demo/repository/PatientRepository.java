package com.InfirmierMnDar.demo.repository;

import com.InfirmierMnDar.demo.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
    Patient findByEmail(String email);
}