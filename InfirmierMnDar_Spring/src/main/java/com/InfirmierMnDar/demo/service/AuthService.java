package com.InfirmierMnDar.demo.service;

import com.InfirmierMnDar.demo.entity.Infirmier;
import com.InfirmierMnDar.demo.entity.Patient;
import com.InfirmierMnDar.demo.entity.AuthResponse;


import com.InfirmierMnDar.demo.repository.InfirmierRepository;
import com.InfirmierMnDar.demo.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private InfirmierRepository infirmierRepository;

    public AuthResponse authenticateUser(String email, String password) {
        System.out.println("Authenticating user with email: " + email);

        // Recherche de l'utilisateur en tant que patient
        Patient patient = patientRepository.findByEmail(email);
        if (patient != null) {
            System.out.println("Found patient with email: " + email);
            if (password.equals(patient.getMotDePasse())) {
                System.out.println("Patient authenticated successfully");
                AuthResponse authResponse = new AuthResponse();
                authResponse.setUserType("PATIENT");
                return authResponse;
            } else {
                System.out.println("Invalid password for patient with email: " + email);
                throw new RuntimeException("Invalid credentials");
            }
        }

        // Recherche de l'utilisateur en tant qu'infirmier
        Infirmier infirmier = infirmierRepository.findByEmail(email);
        if (infirmier != null) {
            System.out.println("Found infirmier with email: " + email);
            if (password.equals(infirmier.getMotDePasse())) {
                System.out.println("Infirmier authenticated successfully");
                AuthResponse authResponse = new AuthResponse();
                authResponse.setUserType("INFIRMIER");
                authResponse.setInfirmierId(infirmier.getId());
                return authResponse;
            } else {
                System.out.println("Invalid password for infirmier with email: " + email);
                throw new RuntimeException("Invalid credentials");
            }
        }

        // Si aucun utilisateur n'a été trouvé ou si le mot de passe est incorrect
        System.out.println("Authentication failed for email: " + email);
        throw new RuntimeException("Invalid credentials");
    }


    public void registerPatient(String nom, String email, String password) {
        System.out.println("Registering patient with email: " + email);
        Patient newPatient = new Patient(nom, email, password);
        patientRepository.save(newPatient);
        System.out.println("Patient registered successfully");
    }

    public void registerInfirmier(String nom, String prenom, String email, String password, String specialite, String ville, String numero, int experience, String cin, String localisation, String imageProfile) {
        System.out.println("Registering infirmier with email: " + email);
        Infirmier newInfirmier = new Infirmier();
        newInfirmier.setNom(nom);
        newInfirmier.setPrenom(prenom);
        newInfirmier.setEmail(email);
        newInfirmier.setMotDePasse(password);
        newInfirmier.setSpecialite(specialite);
        newInfirmier.setVille(ville);
        newInfirmier.setNumero(numero);
        newInfirmier.setExperience(experience);
        newInfirmier.setCin(cin);
        newInfirmier.setImageProfile(imageProfile);
        infirmierRepository.save(newInfirmier);
        System.out.println("Infirmier registered successfully");
    }
}