package dot.petstore.dao;

import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import dot.petstore.model.Servico;
import java.util.List;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(Servico.class)
public interface ServicoDao {

        @GetGeneratedKeys
        @SqlUpdate("INSERT INTO Servico (nome, valor) VALUES (:nome, :valor);")
        int insert(@BindBean Servico servico);

        @SqlQuery("select * " +
                        " from Servico " +
                        " where idServico = :idServico;")
        Servico get(@Bind("idServico") int idServico);

        @SqlQuery("select * " +
                        " from Servico " +
                        " order by nome;")
        List<Servico> getAll();

        @SqlQuery("select * " +
                        " from Servico " +
                        " where nome like :nome " +
                        " order by nome;")
        List<Servico> getAllByName(@Bind("nome") String nome);

        @SqlUpdate("update Servico " +
                        " set nome = :nome, " +
                        "     valor = :valor " +
                        " where idServico = :idServico;")
        int update(@BindBean Servico servico);

        @SqlUpdate("delete " +
                        " from Servico " +
                        " where idServico = :idServico;")
        int delete(@Bind("idServico") int idServico);

}
