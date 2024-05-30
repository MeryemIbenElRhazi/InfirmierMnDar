package com.InfirmierMnDar.demo.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.InfirmierMnDar.demo.entity.Infirmier;
import com.InfirmierMnDar.demo.entity.Request;

import com.InfirmierMnDar.demo.service.InfirmierService;
import com.InfirmierMnDar.demo.service.RequestService;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/infirmiers")
public class InfirmierController {
    private final InfirmierService infirmierService;
    private final RequestService requestService;


    @Autowired
    public InfirmierController(InfirmierService infirmierService, RequestService requestService) {
        this.infirmierService = infirmierService;
		this.requestService =  requestService;
    }

    @GetMapping
    public List<Infirmier> getAllInfirmiers() {
        return infirmierService.getAllInfirmiers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Infirmier> getInfirmierById(@PathVariable int id) {
        Infirmier infirmier = infirmierService.getInfirmierById(id);
        return infirmier != null ? ResponseEntity.ok(infirmier) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Infirmier createInfirmier(@RequestBody Infirmier infirmier) {
        return infirmierService.saveInfirmier(infirmier);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Infirmier> updateInfirmier(@PathVariable int id, @RequestBody Infirmier infirmierDetails) {
        Infirmier infirmier = infirmierService.getInfirmierById(id);
        if (infirmier != null) {
            infirmier.setNom(infirmierDetails.getNom());
            infirmier.setPrenom(infirmierDetails.getPrenom());
            infirmier.setEmail(infirmierDetails.getEmail());
            infirmier.setNumero(infirmierDetails.getNumero());
            infirmier.setSpecialite(infirmierDetails.getSpecialite());
            infirmier.setVille(infirmierDetails.getVille());
            infirmier.setExperience(infirmierDetails.getExperience());
            infirmier.setCin(infirmierDetails.getCin());
            infirmier.setMotDePasse(infirmierDetails.getMotDePasse());
            infirmier.setImageProfile(infirmierDetails.getImageProfile());
            Infirmier updatedInfirmier = infirmierService.saveInfirmier(infirmier);
            return ResponseEntity.ok(updatedInfirmier);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/profile/{id}")
    public ResponseEntity<Infirmier> updateInfirmierprofile(@PathVariable int id, @RequestBody Infirmier infirmierDetails) {
        Infirmier infirmier = infirmierService.getInfirmierById(id);
        if (infirmier != null) {
            infirmier.setNom(infirmierDetails.getNom());
            infirmier.setPrenom(infirmierDetails.getPrenom());
            infirmier.setEmail(infirmierDetails.getEmail());
            Infirmier updatedInfirmier = infirmierService.saveInfirmier(infirmier);
            return ResponseEntity.ok(updatedInfirmier);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInfirmier(@PathVariable int id) {
        if (infirmierService.getInfirmierById(id) != null) {
            infirmierService.deleteInfirmier(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{id}/requests")
    public ResponseEntity<List<Request>> getRequestsByInfirmierId(@PathVariable int id) {
        List<Request> requests = requestService.getRequestsByInfirmierId(id);
        return ResponseEntity.ok(requests);
    }

    
    
}