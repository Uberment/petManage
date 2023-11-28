package dot.petstore.service;

import org.springframework.stereotype.Service;

import dot.petstore.dao.ClienteDao;
import dot.petstore.dao.PetDao;
import dot.petstore.dao.PetServicoDao;
import dot.petstore.model.Cliente;
import dot.petstore.model.Pet;
import dot.petstore.model.PetServico;
import java.util.List;
import org.jdbi.v3.core.Jdbi;

@Service
public class PetServicoService {

    private final PetServicoDao petServicoDao;
    private final ClienteDao clienteDao;
    private final PetDao petDao;

    public PetServicoService(Jdbi jdbi) {
        this.clienteDao = jdbi.onDemand(ClienteDao.class);
        this.petDao = jdbi.onDemand(PetDao.class);
        this.petServicoDao = jdbi.onDemand(PetServicoDao.class);
    }

    public PetServico inserir(PetServico petServico) {
        int idPetServico = petServicoDao.insert(petServico);
        petServico.setIdPetServico(idPetServico);
        return petServico;
    }

    public List<PetServico> consultarTodos() {
        List<PetServico> petServicoList = petServicoDao.getAll();

        for (PetServico petServico : petServicoList) {
            Cliente cliente = clienteDao.get(petServico.getIdCliente());
            petServico.setCliente(cliente);

            Pet pet = petDao.get(petServico.getIdPet());
            petServico.setPet(pet);
        }

        return petServicoList;
    }

    public PetServico consultarPorId(int idPetServico) {
        PetServico petServico = petServicoDao.get(idPetServico);

        if (petServico != null) {
            Cliente cliente = clienteDao.get(petServico.getIdCliente());
            petServico.setCliente(cliente);

            Pet pet = petDao.get(petServico.getIdPet());
            petServico.setPet(pet);
        }

        return petServico;
    }

    public void alterar(PetServico petServico) {
        petServicoDao.update(petServico);
    }

    public void excluir(int idPetServico) {
        petServicoDao.delete(idPetServico);
    }

    public List<PetServico> consultarTodosEspecifico(int executado, int pago) {
        List<PetServico> petServicoList = petServicoDao.getAllPetServicosEspecificos(pago, executado);

        for (PetServico petServico : petServicoList) {
            Cliente cliente = clienteDao.get(petServico.getIdCliente());
            petServico.setCliente(cliente);

            Pet pet = petDao.get(petServico.getIdPet());
            petServico.setPet(pet);
        }

        return petServicoList;
    }
}