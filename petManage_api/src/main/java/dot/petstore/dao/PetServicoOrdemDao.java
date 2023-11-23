/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dot.petstore.dao;

import dot.petstore.model.PetServicoOrdem;

import java.util.List;

import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(PetServicoOrdem.class)
public interface PetServicoOrdemDao {

    @GetGeneratedKeys
    @SqlUpdate("INSERT INTO Pet_Servico_Ordem (idPetServico, idServico) VALUES (:idPetServico, :idServico);")
    int insert(@BindBean PetServicoOrdem petServicoOrdem);

    @SqlQuery("select * " +
            " from Pet_Servico_Ordem" +
            " where idPetServico = :idPetServico;")
    List<PetServicoOrdem> getByIdPetServico(@Bind("idPetServico") int idPetServico);

    @SqlQuery("select * " +
            " from Pet_Servico_Ordem" +
            " where idPetServicoOrdem = :idPetServicoOrdem;")
    PetServicoOrdem consultarPorId(@Bind("idPetServicoOrdem") int idPetServicoOrdem);

    @SqlUpdate("delete " +
            " from Pet_Servico_Ordem " +
            " where idPetServicoOrdem = :idPetServicoOrdem;")
    int delete(@Bind("idPetServicoOrdem") int idPetServicoOrdem);
}
