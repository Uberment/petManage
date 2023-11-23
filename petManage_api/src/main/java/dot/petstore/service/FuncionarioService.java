package dot.petstore.service;

import org.springframework.stereotype.Service;
import dot.petstore.dao.FuncionarioDao;
import dot.petstore.model.Funcionario;
import java.util.List;
import org.jdbi.v3.core.Jdbi;

@Service
public class FuncionarioService {

    private final FuncionarioDao funcionarioDao;
    private final EmailService emailService;

    public FuncionarioService(Jdbi jdbi, EmailService emailService) {
        this.funcionarioDao = jdbi.onDemand(FuncionarioDao.class);
        this.emailService = emailService;
    }

    public Funcionario inserir(Funcionario funcionario) {
        int idFuncionario = funcionarioDao.insert(funcionario);
        funcionario.setIdFuncionario(idFuncionario);
        return funcionario;
    }

    public List<Funcionario> consultarTodos() {
        List<Funcionario> funcionarioList = funcionarioDao.getAll();
        return funcionarioList;
    }

    public Funcionario consultarPorId(int idFuncionario) {
        Funcionario funcionario = funcionarioDao.get(idFuncionario);
        return funcionario;
    }
    
    public List<Funcionario> consultarPorNome(String nomeCompleto) {
        List<Funcionario> funcionarioList = funcionarioDao.getAllByName(nomeCompleto+"%");
        return funcionarioList;
    }

    public void alterar(Funcionario funcionario) {
        funcionarioDao.update(funcionario);
    }

    public void excluir(int idFuncionario) {
        funcionarioDao.delete(idFuncionario);
    }

    // public Funcionario getGerente(String email) {
    //     Funcionario funcionario = funcionarioDao.getGerente(email);
    //     return funcionario;
    // }

    public Funcionario getByEmail(String email) {
        Funcionario funcionario = funcionarioDao.getByEmail(email);
        return funcionario;
    }

    public void recoverSenha(Funcionario funcionario) {
        String texto = "Olá" + funcionario.getNome() + ". Sua senha é '"+ funcionario.getSenha() +"'.";
        emailService.sendSimpleMessage(funcionario.getEmail(), "Recuperação de senha", texto);
    }
}