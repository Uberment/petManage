package dot.petstore.service;

import org.springframework.stereotype.Service;
import dot.petstore.dao.ServicoDao;
import dot.petstore.model.Servico;
import java.util.List;
import org.jdbi.v3.core.Jdbi;

@Service
public class ServicoService {

    private final ServicoDao servicoDao;

    public ServicoService(Jdbi jdbi) {
        this.servicoDao = jdbi.onDemand(ServicoDao.class);
    }

    public Servico inserir(Servico servico) {
        int idServico = servicoDao.insert(servico);
        servico.setIdServico(idServico);
        return servico;
    }

    public List<Servico> consultarTodos() {
        List<Servico> servicoList = servicoDao.getAll();
        return servicoList;
    }

    public Servico consultarPorId(int idServico) {
        Servico servico = servicoDao.get(idServico);
        return servico;
    }
    
    public List<Servico> consultarPorNome(String nomeCompleto) {
        List<Servico> servicoList = servicoDao.getAllByName(nomeCompleto+"%");
        return servicoList;
    }

    public void alterar(Servico servico) {
        servicoDao.update(servico);
    }

    public void excluir(int idServico) {
        servicoDao.delete(idServico);
    }
}
