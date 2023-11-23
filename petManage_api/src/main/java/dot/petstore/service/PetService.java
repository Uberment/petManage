package dot.petstore.service;

import org.springframework.stereotype.Service;
import dot.petstore.dao.PetDao;
import dot.petstore.model.Pet;
import java.util.List;
import org.jdbi.v3.core.Jdbi;

@Service
public class PetService {

    private final PetDao petDao;

    public PetService(Jdbi jdbi) {
        this.petDao = jdbi.onDemand(PetDao.class);
    }

    public Pet inserir(Pet pet) {
        int idPet = petDao.insert(pet);
        pet.setIdPet(idPet);
        return pet;
    }

    public List<Pet> consultarTodos() {
        List<Pet> petList = petDao.getAll();
        return petList;
    }

    public List<Pet> consultarPorIdCliente(int idCliente) {
        List<Pet> petList = petDao.getAllByCliente(idCliente);
        return petList;
    }
    public Pet consultarPorId(int idPet) {
        Pet pet = petDao.get(idPet);
        return pet;
    }

    public void alterar(Pet pet) {
        petDao.update(pet);
    }

    public void excluir(int idPet) {
        petDao.delete(idPet);
    }
}