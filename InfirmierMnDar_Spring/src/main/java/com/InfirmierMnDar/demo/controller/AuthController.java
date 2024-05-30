package com.InfirmierMnDar.demo.controller;

import com.InfirmierMnDar.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.InfirmierMnDar.demo.entity.AuthResponse;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Received login request for: " + loginRequest.getEmail());
        try {
            AuthResponse authResponse = authService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
            System.out.println("User authenticated as: " + authResponse.getUserType());
            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body(null);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody SignUpRequest signUpRequest) {
        System.out.println("Received sign-up request for: " + signUpRequest.getEmail());
        try {
            authService.registerPatient(signUpRequest.getNom(), signUpRequest.getEmail(), signUpRequest.getPassword());
            System.out.println("User registered successfully");
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("Failed to register user");
        }
    }

    @PostMapping("/signup-infirmier")
    public ResponseEntity<String> signUpInfirmier(@RequestBody SignUpInfirmierRequest signUpInfirmierRequest) {
        System.out.println("Received sign-up request for infirmier: " + signUpInfirmierRequest.getEmail());
        try {
            authService.registerInfirmier(
                signUpInfirmierRequest.getNom(),
                signUpInfirmierRequest.getPrenom(),
                signUpInfirmierRequest.getEmail(),
                signUpInfirmierRequest.getPassword(),
                signUpInfirmierRequest.getSpecialite(),
                signUpInfirmierRequest.getVille(),
                signUpInfirmierRequest.getNumero(),
                signUpInfirmierRequest.getExperience(),
                signUpInfirmierRequest.getCin(),
                signUpInfirmierRequest.getLocalisation(),
                signUpInfirmierRequest.getImageProfile()
            );
            System.out.println("Infirmier registered successfully");
            return ResponseEntity.ok("Infirmier registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("Failed to register infirmier");
        }
    }
}

class LoginRequest {
    private String email;
    private String password;

    // Getters et setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

class SignUpRequest {
    private String nom;
    private String email;
    private String password;

    // Getters et setters
    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

class SignUpInfirmierRequest {
    private String nom;
    private String prenom;
    private String email;
    private String password;
    private String specialite;
    private String ville;
    private String numero;
    private int experience;
    private String cin;
    private String localisation;
    private String imageProfile;

    // Getters et setters
    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSpecialite() {
        return specialite;
    }

    public void setSpecialite(String specialite) {
        this.specialite = specialite;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getLocalisation() {
        return localisation;
    }

    public void setLocalisation(String localisation) {
        this.localisation = localisation;
    }

    public String getImageProfile() {
        return imageProfile;
    }

    public void setImageProfile(String imageProfile) {
        this.imageProfile = imageProfile;
    }
}