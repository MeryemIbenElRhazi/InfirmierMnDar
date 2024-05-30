package com.InfirmierMnDar.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.InfirmierMnDar.demo.entity.Request;
import com.InfirmierMnDar.demo.entity.Infirmier;
import com.InfirmierMnDar.demo.repository.RequestRepository;
import com.InfirmierMnDar.demo.repository.InfirmierRepository;

import java.util.List;

@Service
public class RequestService {
    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private InfirmierRepository infirmierRepository;
    
    @Autowired
    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public Request getRequestById(Long id) {
        return requestRepository.findById(id).orElse(null);
    }

    public Request saveRequest(Request request) {
        return requestRepository.save(request);
    }

    public void deleteRequest(Long id) {
        requestRepository.deleteById(id);
    }

    public Infirmier getInfirmierById(int id) {
        return infirmierRepository.findById(id).orElse(null);
    }
 // Méthode pour récupérer les demandes par ID d'infirmier
    public List<Request> getRequestsByInfirmierId(int infirmierId) {
        return requestRepository.findByInfirmierId(infirmierId);
    }
}
