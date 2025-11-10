package com.example.authservice.controller;

import com.example.authservice.dto.AuthenticationRequest;
import com.example.authservice.dto.AuthenticationResponse;
import com.example.authservice.dto.LightRegisterRequest;
import com.example.authservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody LightRegisterRequest lightRegisterRequest) throws Exception {
        return ResponseEntity.ok(authService.register(lightRegisterRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        return ResponseEntity.ok(authService.login(authenticationRequest));
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello() throws Exception {
        return ResponseEntity.ok("hello");
    }
}
