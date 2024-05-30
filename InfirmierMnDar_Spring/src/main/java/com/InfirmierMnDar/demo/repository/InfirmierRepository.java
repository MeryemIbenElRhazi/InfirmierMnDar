package com.InfirmierMnDar.demo.repository;

import com.InfirmierMnDar.demo.entity.Infirmier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfirmierRepository extends JpaRepository<Infirmier, Integer> {
    Infirmier findByEmail(String email);
}