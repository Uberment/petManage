/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dot.petstore.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetServico {
    private int idPetServico;
    private int idPet;
    private Pet pet;
    private Cliente cliente;
    private int idCliente;
    private String dtPedido;
    private String dtExecucao;
    private String observacao;
    private double valor;
    private boolean flPago;
    private boolean flExecutado;
}
