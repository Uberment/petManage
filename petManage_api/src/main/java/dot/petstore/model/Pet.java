package dot.petstore.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pet {
    private int idPet;
    private int idCliente;
    private String nome;
    private String raca;
    private String sexo;
    private String dtNascimento;
    private double peso;
}