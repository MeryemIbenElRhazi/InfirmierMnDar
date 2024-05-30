package com.InfirmierMnDar.demo.controller;

import com.InfirmierMnDar.demo.entity.Patient;
import com.InfirmierMnDar.demo.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
    @Autowired
    private PatientService patientService;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable int id) {
        return patientService.getPatientById(id);
    }

    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientService.savePatient(patient);
    }

    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable int id, @RequestBody Patient patientDetails) {
        Patient patient = patientService.getPatientById(id);
        if (patient != null) {
            patient.setNom(patientDetails.getNom());
            patient.setPrenom(patientDetails.getPrenom());
            patient.setEmail(patientDetails.getEmail());
            patient.setMotDePasse(patientDetails.getMotDePasse());
            patient.setImageProfile(patientDetails.getImageProfile());
            return patientService.savePatient(patient);
        }
        return null;
    }
    
    @PutMapping("/profile/{id}")
    public Patient updatePatientprofile(@PathVariable int id, @RequestBody Patient patientDetails) {
        Patient patient = patientService.getPatientById(id);
        if (patient != null) {
            patient.setNom(patientDetails.getNom());
            patient.setPrenom(patientDetails.getPrenom());
            patient.setEmail(patientDetails.getEmail());
            return patientService.savePatient(patient);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable int id) {
        patientService.deletePatient(id);
    }
}