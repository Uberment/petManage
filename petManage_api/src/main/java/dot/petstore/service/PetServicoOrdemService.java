package dot.petstore.service;

import org.springframework.stereotype.Service;
import dot.petstore.dao.PetServicoOrdemDao;
import dot.petstore.model.PetServicoOrdem;

import java.util.List;
import org.jdbi.v3.core.Jdbi;

@Service
public class PetServicoOrdemService {

    private final PetServicoOrdemDao petServicoOrdemDao;

    public PetServicoOrdemService(Jdbi jdbi) {
        this.petServicoOrdemDao = jdbi.onDemand(PetServicoOrdemDao.class);
    }

    public PetServicoOrdem inserir(PetServicoOrdem petServicoOrdem) {
        int idPetServico = petServicoOrdemDao.insert(petServicoOrdem);
        petServicoOrdem.setIdPetServicoOrdem(idPetServico);
        return petServicoOrdem;
    }

    public PetServicoOrdem consultarPorId(int idPetServicoOrdem) {
        PetServicoOrdem petServico = petServicoOrdemDao.consultarPorId(idPetServicoOrdem);
        return petServico;
    }

    public List<PetServicoOrdem> consultarTodosPorServico(int idPetServico) {
        List<PetServicoOrdem> petServicoList = petServicoOrdemDao.getByIdPetServico(idPetServico);
        return petServicoList;
    }

    public void excluir(int idPetServico) {
        petServicoOrdemDao.delete(idPetServico);
    }
}