package dot.petstore.controller;

    //Administra funções com a classe Pet

import dot.petstore.model.Pet;
import dot.petstore.service.PetService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pet")
@CrossOrigin("*")

public class PetController {
    private final PetService petService;

    public PetController(PetService petService){
        this.petService = petService;
    }

    @GetMapping({"/", ""})
    public List<Pet> getAllPets(){
        List<Pet> PetList = petService.consultarTodos();
        return PetList;
    }

    @GetMapping("/{idPet}")
    public Pet findPetById(@PathVariable("idPet") int idPet){
        Pet ret = petService.consultarPorId(idPet);
        return ret;
    }
    
    @GetMapping("/cliente/{idCliente}")
    public List<Pet> findPetByIdCliente(@PathVariable("idCliente") int idCliente){
        List<Pet> PetList = petService.consultarPorIdCliente(idCliente);
        return PetList;
    }
    
    @PostMapping({"", "/"})
    public Pet createPet(@RequestBody Pet pet){
        Pet ret = petService.inserir(pet);
        return ret;
    }

    @PutMapping({"", "/"})
    public Pet updatePet(@RequestBody Pet pet){
        petService.alterar(pet);
        return pet;
    }

    @DeleteMapping("/{idPet}")
    public Pet deletePet(@PathVariable("idPet") int idPet){
        Pet Pet = petService.consultarPorId(idPet);
        if (Pet == null) {
            throw new RuntimeException("Nao existe aluno com este id para ser excluido....");
        }
        petService.excluir(idPet);
        return Pet;
    }
}
