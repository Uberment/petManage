package dot.petstore.service;

import org.springframework.stereotype.Service;
import dot.petstore.dao.PetServicoDao;
import dot.petstore.model.PetServico;
import java.util.List;
import org.jdbi.v3.core.Jdbi;

@Service
public class PetServicoService {

    private final PetServicoDao petServicoDao;

    public PetServicoService(Jdbi jdbi) {
        this.petServicoDao = jdbi.onDemand(PetServicoDao.class);
    }

    public PetServico inserir(PetServico petServico) {
        int idPetServico = petServicoDao.insert(petServico);
        petServico.setIdPetServico(idPetServico);
        return petServico;
    }

    public List<PetServico> consultarTodos() {
        List<PetServico> petServicoList = petServicoDao.getAll();
        return petServicoList;
    }

    public PetServico consultarPorId(int idPetServico) {
        PetServico petServico = petServicoDao.get(idPetServico);
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
        return petServicoList;
    }
}