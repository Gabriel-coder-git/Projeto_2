package com.Gabriel.API_Banco.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListarCotacoesDTO {
    private Long idUsuario;
    private Long idLoja;
    private ListarProdutosDTO produto;

}
