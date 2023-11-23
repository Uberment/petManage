package dot.petstore.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Funcionario {
    private int idFuncionario;
    private String nome;
    private String endereco;
    private String senha;
    private String cpf;
    private String email;
    private String telefone;
    private boolean gerente;
}
