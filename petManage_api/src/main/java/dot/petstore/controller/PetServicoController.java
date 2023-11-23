package dot.petstore.controller;

    //Administra funções com a classe PetServico

import dot.petstore.model.PetServico;
import dot.petstore.service.PetServicoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/petServico")
@CrossOrigin("*")

public class PetServicoController {
    private final PetServicoService petServicoService;

    public PetServicoController(PetServicoService petServicoService){
        this.petServicoService = petServicoService;
    }

    @GetMapping({"/", ""})
    public List<PetServico> getAllPetServicos(){
        List<PetServico> PetServicoList = petServicoService.consultarTodos();
        return PetServicoList;
    }

    @GetMapping("/{executado}/{pago}")
    public List<PetServico> getAllPetServicosEspecificos(@PathVariable("executado") int executado, @PathVariable("pago") int pago){
        List<PetServico> PetServicoList = petServicoService.consultarTodosEspecifico(executado, pago);
        return PetServicoList;
    }

    @GetMapping("/{idPetServico}")
    public PetServico findPetServicoById(@PathVariable("idPetServico") int idPetServico){
        PetServico ret = petServicoService.consultarPorId(idPetServico);
        return ret;
    }

    @PostMapping({"", "/"})
    public PetServico createPetServico(@RequestBody PetServico PetServico){
        PetServico ret = petServicoService.inserir(PetServico);
        return ret;
    }

    @PutMapping({"", "/"})
    public PetServico updatePetServico(@RequestBody PetServico PetServico){
        petServicoService.alterar(PetServico);
        return PetServico;
    }

    @DeleteMapping("/{idPetServico}")
    public PetServico deletePetServico(@PathVariable("idPetServico") int idPetServico){
        PetServico PetServico = petServicoService.consultarPorId(idPetServico);
        if (PetServico == null) {
            throw new RuntimeException("Nao existe aluno com este id para ser excluido....");
        }
        petServicoService.excluir(idPetServico);
        return PetServico;
    }
}
