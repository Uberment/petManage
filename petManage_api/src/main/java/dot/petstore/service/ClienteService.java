package dot.petstore.service;

import org.springframework.stereotype.Service;
import dot.petstore.dao.ClienteDao;
import dot.petstore.model.Cliente;
import java.util.List;
import org.jdbi.v3.core.Jdbi;

@Service
public class ClienteService {

    private final ClienteDao clienteDao;

    public ClienteService(Jdbi jdbi) {
        this.clienteDao = jdbi.onDemand(ClienteDao.class);
    }

    public Cliente inserir(Cliente cliente) {
        int idCliente = clienteDao.insert(cliente);
        cliente.setIdCliente(idCliente);
        return cliente;
    }

    public List<Cliente> getAllClientes() {
        List<Cliente> clienteList = clienteDao.getAllClientes();
        return clienteList;
    }

    public Cliente consultarPorId(int idCliente) {
        Cliente cliente = clienteDao.get(idCliente);
        return cliente;
    }

    public List<Cliente> consultarPorNome(String nomeCompleto) {
        List<Cliente> clienteList = clienteDao.getAllByName(nomeCompleto+"%");
        return clienteList;
    }

    public void alterar(Cliente cliente) {
        clienteDao.update(cliente);
    }

    public void excluir(int idCliente) {
        clienteDao.delete(idCliente);
    }
}
