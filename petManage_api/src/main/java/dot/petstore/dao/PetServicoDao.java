/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dot.petstore.dao;

import dot.petstore.model.PetServico;
import java.util.List;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(PetServico.class)
public interface PetServicoDao {

        @GetGeneratedKeys
        @SqlUpdate("INSERT INTO Pet_Servico (idPet, idCliente, observacao, dtPedido, dtExecucao, valor, flPago, flExecutado) VALUES (:idPet, :idCliente, :observacao, :dtPedido, :dtExecucao, :valor, :flPago, :flExecutado);")
        int insert(@BindBean PetServico petServico);

        @SqlQuery("select * " +
                        " from pet_servico " +
                        " where idPetServico = :idPetServico;")
        PetServico get(@Bind("idPetServico") int idPetServico);

        @SqlQuery("select * " +
                        " from pet_servico " +
                        " order by dtPedido;")
        List<PetServico> getAll();

        @SqlQuery("select * " +
                        " from pet_servico " +
                        " where (flPago = :flPago OR -1 = :flPago) " +
                        " and (flExecutado = :flExecutado OR -1 = :flExecutado)" +
                        " order by dtPedido;")
        List<PetServico> getAllPetServicosEspecificos(@Bind("flPago") int flPago, @Bind("flExecutado") int flExecutado);

        @SqlUpdate("update pet_servico " +
                        " set flPago = :flPago, " +
                        " observacao = :observacao, " +
                        " valor = :valor," +
                        " dtPedido = :dtPedido," +
                        " dtExecucao = :dtExecucao," +
                        " flExecutado = :flExecutado" +
                        " where idPetServico = :idPetServico;")
        int update(@BindBean PetServico petServico);

        @SqlUpdate("delete " +
                        " from Pet_Servico " +
                        " where idPetServico = :idPetServico;")
        int delete(@Bind("idPetServico") int idPetServico);

}
