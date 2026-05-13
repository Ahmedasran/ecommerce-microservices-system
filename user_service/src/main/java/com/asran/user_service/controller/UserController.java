package com.asran.user_service.controller;

import com.asran.user_service.dto.LoginRequest;
import com.asran.user_service.dto.LoginResponse;
import com.asran.user_service.dto.RegisterRequest;
import com.asran.user_service.entity.User;
import com.asran.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request
    ){

        return userService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request
    ){

        return userService.login(request);
    }

    @GetMapping
    public List<User> getAllUsers(){

        return userService.getAllUsers();
    }
}