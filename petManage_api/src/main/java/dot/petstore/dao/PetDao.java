package dot.petstore.dao;

import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import dot.petstore.model.Pet;
import java.util.List;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(Pet.class)
public interface PetDao {

        @GetGeneratedKeys
        @SqlUpdate("INSERT INTO Pet (idCliente, nome, raca, sexo, dtNascimento, peso) VALUES (:idCliente, :nome, :raca, :sexo, :dtNascimento, :peso);")
        int insert(@BindBean Pet pet);

        @SqlQuery("select * " +
                        " from Pet " +
                        " where idPet = :idPet;")
        Pet get(@Bind("idPet") int idPet);

        @SqlQuery("select * " +
                        " from Pet " +
                        " order by nome;")
        List<Pet> getAll();

        @SqlQuery("select * " +
                        " from Pet " +
                        " where idCliente = :idCliente " +
                        " order by nome;")
        List<Pet> getAllByCliente(@Bind("idCliente") int idCliente);

        @SqlQuery("select * " +
                        " from Pet " +
                        " where nome like :nome " +
                        " order by nome;")
        List<Pet> getAllByName(@Bind("nome") String nome);

        @SqlUpdate("update Pet " +
                        " set nome = :nome, " +
                        "     raca = :raca, " +
                        "     sexo = :sexo, " +
                        "     dtNascimento = :dtNascimento, " +
                        "     peso = :peso " +
                        " where idPet = :idPet;")
        int update(@BindBean Pet pet);

        @SqlUpdate("delete " +
                        " from Pet " +
                        " where idPet = :idPet;")
        int delete(@Bind("idPet") int idPet);

}
