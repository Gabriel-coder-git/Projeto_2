import {API} from "../core/api.js";
import {getUsuarioLogado} from "../core/auth.js";

const form = document.getElementById("form-foto-perfil");
const inputFoto = document.getElementById("inputFoto");
const imgFoto = document.getElementById("fotoPerfil");

const usuarioId = getUsuarioLogado().id;


export async function salvarFotoPerfil() {

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = inputFoto.files[0];

    if (!file) {
        alert("Selecione uma imagem!");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(
            `${API}/usuarios/setarFotoPerfil/${usuarioId}`,
            {
                method: "POST",
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao enviar imagem");
        }

        const imageUrl = await response.text();

        // Atualiza a imagem na tela
        imgFoto.src = imageUrl;

        alert("Foto atualizada com sucesso!");

    } catch (error) {
        console.error(error);
        alert("Erro ao atualizar foto");
    }
})}


export async function carregarFotoUsuario() {
    const response = await fetch(`${API}/usuarios/getFotoPerfil/${usuarioId}`);
    const usuario = await response.json();

    if (usuario.fotoUrl && usuario.fotoUrl.trim() !== "") {
        imgFoto.src = usuario.fotoUrl;
    } else {
        imgFoto.src = "imgs/9742847.png";
    }
}