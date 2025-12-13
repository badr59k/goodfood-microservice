package com.example.restaurant_service.controller;

import com.example.restaurant_service.entity.Plat;
import com.example.restaurant_service.service.PlatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/plats")
public class PlatController {

    private final PlatService platService;

    @GetMapping
    public ResponseEntity<List<Plat>> findAll() {
        List<Plat> plats = platService.getAllPlats();
        return ResponseEntity.ok(plats);


    }
}
