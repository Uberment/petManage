package dot.petstore.controller;

    //Administra funções com a classe Cliente

import dot.petstore.model.Cliente;
import dot.petstore.service.ClienteService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cliente")
@CrossOrigin("*")

public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService){
        this.clienteService = clienteService;
    }

    @GetMapping({"/", ""})
    public List<Cliente> getAllClientes(){
        List<Cliente> clienteList = clienteService.getAllClientes();
        return clienteList;
    }

    @GetMapping("/{idCliente}")
    public Cliente findClienteById(@PathVariable("idCliente") int idCliente){
        Cliente ret = clienteService.consultarPorId(idCliente);
        return ret;
    }

    @PostMapping({"", "/"})
    public Cliente createCliente(@RequestBody Cliente cliente){
        Cliente ret = clienteService.inserir(cliente);
        return ret;
    }

    @PutMapping({"", "/"})
    public Cliente updateCliente(@RequestBody Cliente cliente){
        clienteService.alterar(cliente);
        return cliente;
    }

    @DeleteMapping("/{idCliente}")
    public Cliente deleteCliente(@PathVariable("idCliente") int idCliente){
        Cliente cliente = clienteService.consultarPorId(idCliente);
        if (cliente == null) {
            throw new RuntimeException("Nao existe aluno com este id para ser excluido....");
        }
        clienteService.excluir(idCliente);
        return cliente;
    }
}
