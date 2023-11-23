package dot.petstore.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {
    private int idCliente;
    private String nome;
    private String cpf;
    private String endereco;
    private String email;
    private String telefone;
}