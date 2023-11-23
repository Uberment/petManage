package dot.petstore.dao;

import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import dot.petstore.model.Cliente;
import java.util.List;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(Cliente.class)
public interface ClienteDao {

        @GetGeneratedKeys
        @SqlUpdate("INSERT INTO Cliente (nome, cpf, endereco, email, telefone) VALUES (:nome, :cpf, :endereco, :email, :telefone);")
        int insert(@BindBean Cliente cliente);

        @SqlQuery("select * " +
                        " from Cliente " +
                        " where idCliente = :idCliente;")
        Cliente get(@Bind("idCliente") int idCliente);

        @SqlQuery("select * " +
                        " from Cliente " +
                        " order by nome;")
        List<Cliente> getAllClientes();

        @SqlQuery("select * " +
                        " from Cliente " +
                        " where nome like :nome " +
                        " order by nome;")
        List<Cliente> getAllByName(@Bind("nome") String nome);

        @SqlUpdate("update Cliente " +
                        " set nome = :nome, " +
                        "     cpf = :cpf, " +
                        "     endereco = :endereco, " +
                        "     email = :email, " +
                        "     telefone = :telefone " +
                        " where idCliente = :idCliente;")
        int update(@BindBean Cliente cliente);

        @SqlUpdate("delete " +
                        " from Cliente " +
                        " where idCliente = :idCliente;")
        int delete(@Bind("idCliente") int idCliente);

}
