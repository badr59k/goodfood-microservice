package com.example.authservice.config;

import lombok.Getter;
import lombok.Setter;
import org.bouncycastle.asn1.pkcs.PrivateKeyInfo;
import org.bouncycastle.asn1.x509.SubjectPublicKeyInfo;
import org.bouncycastle.openssl.PEMParser;
import org.bouncycastle.openssl.jcajce.JcaPEMKeyConverter;

import java.io.FileReader;
import java.io.Reader;
import java.security.PrivateKey;
import java.security.PublicKey;

public class RsaKeyProvider {

    @Getter
    private static final PrivateKey privateKey;

    @Getter
    private static final PublicKey publicKey;

    static {
        try {
            privateKey = loadPrivateKey("src/main/resources/keys/private.pem");
            publicKey = loadPublicKey("src/main/resources/keys/public.pem");
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors du chargement des clés", e);
        }
    }

    private static PrivateKey loadPrivateKey(String filePath) throws Exception {
        try (Reader reader = new FileReader(filePath);
             PEMParser pemParser = new PEMParser(reader)) {

            Object object = pemParser.readObject();
            JcaPEMKeyConverter converter = new JcaPEMKeyConverter();

            if (object instanceof PrivateKeyInfo) {
                return converter.getPrivateKey((PrivateKeyInfo) object);
            } else {
                throw new IllegalArgumentException("Format de clé privée invalide");
            }
        }
    }

    private static PublicKey loadPublicKey(String filePath) throws Exception {
        try (Reader reader = new FileReader(filePath);
             PEMParser pemParser = new PEMParser(reader)) {

            Object object = pemParser.readObject();
            JcaPEMKeyConverter converter = new JcaPEMKeyConverter();

            if (object instanceof SubjectPublicKeyInfo) {
                return converter.getPublicKey((SubjectPublicKeyInfo) object);
            } else {
                throw new IllegalArgumentException("Format de clé publique invalide");
            }
        }
    }
}
