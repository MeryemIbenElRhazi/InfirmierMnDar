package com.InfirmierMnDar.demo.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.InfirmierMnDar.demo.entity.Infirmier;
import com.InfirmierMnDar.demo.repository.InfirmierRepository;

@Service
public class InfirmierService {
	
    //private final InfirmierRepository infirmierRepository;

   // @Autowired
    //public InfirmierService(InfirmierRepository infirmierRepository) {
      //  this.infirmierRepository = infirmierRepository;
    //}
	@Autowired
	public InfirmierRepository infirmierRepository;

	
    public List<Infirmier> getAllInfirmiers() {
        return infirmierRepository.findAll();
    }

    public Infirmier getInfirmierById(int id) {
        return infirmierRepository.findById(id).orElse(null);
    }

    public Infirmier saveInfirmier(Infirmier infirmier) {
        return infirmierRepository.save(infirmier);
    }

    public void deleteInfirmier(int id) {
        infirmierRepository.deleteById(id);
    }

    // Additional methods can be added here as needed
}

