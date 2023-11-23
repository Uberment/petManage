package dot.petstore.controller;

    //Administra funções com a classe Servico

import dot.petstore.model.Servico;
import dot.petstore.service.ServicoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/servico")
@CrossOrigin("*")

public class ServicoController {
    private final ServicoService servicoService;

    public ServicoController(ServicoService servicoService){
        this.servicoService = servicoService;
    }

    @GetMapping({"/", ""})
    public List<Servico> getAllServicos(){
        List<Servico> ServicoList = servicoService.consultarTodos();
        return ServicoList;
    }

    @GetMapping("/{idServico}")
    public Servico findServicoById(@PathVariable("idServico") int idServico){
        Servico ret = servicoService.consultarPorId(idServico);
        return ret;
    }

    @PostMapping({"", "/"})
    public Servico createServico(@RequestBody Servico servico){
        Servico ret = servicoService.inserir(servico);
        return ret;
    }

    @PutMapping({"", "/"})
    public Servico updateServico(@RequestBody Servico servico){
        servicoService.alterar(servico);
        return servico;
    }

    @DeleteMapping("/{idServico}")
    public Servico deleteServico(@PathVariable("idServico") int idServico){
        Servico servico = servicoService.consultarPorId(idServico);
        if (servico == null) {
            throw new RuntimeException("Nao existe aluno com este id para ser excluido....");
        }
        servicoService.excluir(idServico);
        return servico;
    }
}
