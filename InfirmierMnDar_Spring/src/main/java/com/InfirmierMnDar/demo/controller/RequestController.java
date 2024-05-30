package com.InfirmierMnDar.demo.controller;

import com.InfirmierMnDar.demo.entity.Request;
import com.InfirmierMnDar.demo.entity.Infirmier;
import com.InfirmierMnDar.demo.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {
    @Autowired
    private RequestService requestService;

    @GetMapping
    public List<Request> getAllRequests() {
        return requestService.getAllRequests();
    }

    @GetMapping("/{id}")
    public Request getRequestById(@PathVariable Long id) {
        return requestService.getRequestById(id);
    }

    @PostMapping
    public Request createRequest(@RequestBody Request request) {
        if (request.getInfirmier() != null) {
            Infirmier infirmier = requestService.getInfirmierById(request.getInfirmier().getId());
            request.setInfirmier(infirmier);
        }
        return requestService.saveRequest(request);
    }

    @PutMapping("/{id}")
    public Request updateRequest(@PathVariable Long id, @RequestBody Request requestDetails) {
        Request request = requestService.getRequestById(id);
        if (request != null) {
            request.setPatientFullName(requestDetails.getPatientFullName());
            request.setPatientPhone(requestDetails.getPatientPhone());
            request.setPatientAddress(requestDetails.getPatientAddress());
            if (requestDetails.getInfirmier() != null) {
                Infirmier infirmier = requestService.getInfirmierById(requestDetails.getInfirmier().getId());
                request.setInfirmier(infirmier);
            }
            return requestService.saveRequest(request);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);
    }
}