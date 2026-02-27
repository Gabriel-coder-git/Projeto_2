package com.Gabriel.API_Banco.service;

import com.Gabriel.API_Banco.model.Usuario;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class ImageService {

    private final Cloudinary cloudinary;

    public ImageService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadProfileImage(MultipartFile file) throws IOException {

        validarImagem(file);

        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "folder", "profile_pictures"
                )
        );

        return uploadResult.get("secure_url").toString();
    }

    private void validarImagem(MultipartFile file) {

        if (file.isEmpty()) {
            throw new RuntimeException("Arquivo vazio.");
        }

        if (file.getSize() > 1_048_576) {
            throw new RuntimeException("Arquivo maior que 1MB.");
        }

        String contentType = file.getContentType();

        if (!List.of("image/png", "image/jpeg", "image/jpg").contains(contentType)) {
            throw new RuntimeException("Formato inválido. Apenas PNG e JPG permitidos.");
        }
    }

}
