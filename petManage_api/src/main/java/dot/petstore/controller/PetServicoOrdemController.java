package dot.petstore.controller;

    //Administra funções com a classe PetServico

import dot.petstore.model.PetServicoOrdem;
import dot.petstore.service.PetServicoOrdemService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/petServicoOrdem")
@CrossOrigin("*")

public class PetServicoOrdemController {
    private final PetServicoOrdemService petServicoOrdemService;

    public PetServicoOrdemController(PetServicoOrdemService petServicoOrdemService){
        this.petServicoOrdemService = petServicoOrdemService;
    }

    @GetMapping("/agenda/{idPetServico}")
    public List<PetServicoOrdem> findPetServicoById(@PathVariable("idPetServico") int idPetServico){
        List <PetServicoOrdem> ret = petServicoOrdemService.consultarTodosPorServico(idPetServico);
        return ret;
    }
    

    @PostMapping({"", "/"})
    public PetServicoOrdem createPetOrdemServico(@RequestBody PetServicoOrdem petServicoOrdem){
        PetServicoOrdem ret = petServicoOrdemService.inserir(petServicoOrdem);
        return ret;
    }


    @DeleteMapping("/{idPetServico}")
    public PetServicoOrdem deletePetServico(@PathVariable("idPetServico") int idPetServicoOrdem){
        PetServicoOrdem petServicoOrdem = petServicoOrdemService.consultarPorId(idPetServicoOrdem);
        if (petServicoOrdem == null) {
            throw new RuntimeException("Nao existe aluno com este id para ser excluido....");
        }
        petServicoOrdemService.excluir(idPetServicoOrdem);
        return petServicoOrdem;
    }
}
