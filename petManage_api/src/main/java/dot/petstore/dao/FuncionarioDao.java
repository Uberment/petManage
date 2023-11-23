package dot.petstore.dao;

import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import dot.petstore.model.Funcionario;
import java.util.List;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(Funcionario.class)
public interface FuncionarioDao {

        @GetGeneratedKeys
        @SqlUpdate("INSERT INTO Funcionario (nome, endereco, senha, cpf, email, telefone, gerente) VALUES (:nome, :endereco, :senha, :cpf, :email, :telefone, :gerente);")
        int insert(@BindBean Funcionario funcionario);

        @SqlQuery("select * " +
                        " from Funcionario " +
                        " where idFuncionario = :idFuncionario;")
        Funcionario get(@Bind("idFuncionario") int idFuncionario);

        @SqlQuery("select * " +
                        " from Funcionario " +
                        " order by nome;")
        List<Funcionario> getAll();

        @SqlQuery("select * " +
                        " from Funcionario " +
                        " where nome like :nome " +
                        " order by nome;")
        List<Funcionario> getAllByName(@Bind("nome") String nome);

        @SqlUpdate("update Funcionario " +
                        " set nome = :nome, " +
                        "     endereco = :endereco, " +
                        "     senha = :senha, " +
                        "     cpf = :cpf, " +
                        "     email = :email, " +
                        "     gerente = :gerente," +
                        "     telefone = :telefone " +
                        " where idFuncionario = :idFuncionario;")
        int update(@BindBean Funcionario funcionario);

        @SqlUpdate("delete " +
                        " from Funcionario " +
                        " where idFuncionario = :idFuncionario;")
        int delete(@Bind("idFuncionario") int idFuncionario);

        // @SqlQuery("select * "
        //                 + "from Funcionario "
        //                 + "where email like :email "
        //                 + "and email = 'analiciateixeira2016@gmail.com';")
        // Funcionario getGerente(String email);

        @SqlQuery("select * "
                        + "from Funcionario "
                        + "where email like :email;")
        Funcionario getByEmail(String email);
}
