package dot.petstore.controller;

//Administra funções com a classe funcionario

import dot.petstore.model.Funcionario;
import dot.petstore.service.FuncionarioService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/funcionario")
@CrossOrigin("*")

public class FuncionarioController {
    private final FuncionarioService funcionarioService;

    public FuncionarioController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }

    @GetMapping({ "/", "" })
    public List<Funcionario> getAllFuncionarios() {
        List<Funcionario> funcionarioList = funcionarioService.consultarTodos();
        return funcionarioList;
    }

    @GetMapping("/{idfuncionario}")
    public Funcionario findfuncionarioById(@PathVariable("idfuncionario") int idfuncionario) {
        Funcionario ret = funcionarioService.consultarPorId(idfuncionario);
        return ret;
    }

    @PostMapping({ "", "/" })
    public Funcionario createFuncionario(@RequestBody Funcionario funcionario) {
        Funcionario ret = funcionarioService.inserir(funcionario);
        return ret;
    }

    @PutMapping({ "", "/" })
    public Funcionario updateFuncionario(@RequestBody Funcionario funcionario) {
        funcionarioService.alterar(funcionario);
        return funcionario;
    }

    @DeleteMapping("/{idfuncionario}")
    public Funcionario deleteFuncionario(@PathVariable("idfuncionario") int idfuncionario) {
        Funcionario funcionario = funcionarioService.consultarPorId(idfuncionario);
        if (funcionario == null) {
            throw new RuntimeException("Nao existe aluno com este id para ser excluido....");
        }
        funcionarioService.excluir(idfuncionario);
        return funcionario;
    }

    @GetMapping("/email/{email}/exists")
    public boolean autenticarEmail(@PathVariable("email") String email) {
        Funcionario funcionario = funcionarioService.getByEmail(email);

        if (funcionario != null && funcionario.getEmail().equals(email)) {
            return true;
        }
        return false;
    }

    @GetMapping("/recover/{email}")
    public Funcionario recuperarSenha(@PathVariable("email") String email) {
        Funcionario funcionario = funcionarioService.getByEmail(email);

        if (funcionario != null) {
            funcionarioService.recoverSenha(funcionario);
        }

        return funcionario;
    }

    // @GetMapping("/gerente/{email}/exists")
    // public boolean autenticarGerente(@PathVariable("email") String email) {
    //     Funcionario gerente = funcionarioService.getGerente(email);

    //     if (gerente != null && gerente.getEmail().equals(email)) {
    //         return true;
    //     }
    //     return false;
    // }

    @GetMapping("/{email}/{senha}/authenticate")
    public Funcionario autenticar(@PathVariable("email") String email, @PathVariable("senha") String senha) {
        Funcionario funcionario = funcionarioService.getByEmail(email);

        if (funcionario != null && funcionario.getEmail().equals(email) && funcionario.getSenha().equals(senha)) {
            return funcionario;
        } else
            return null;
    }

}
