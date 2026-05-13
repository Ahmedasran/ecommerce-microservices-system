package com.asran.user_service.service;

import com.asran.user_service.dto.LoginRequest;
import com.asran.user_service.dto.LoginResponse;
import com.asran.user_service.dto.RegisterRequest;
import com.asran.user_service.entity.User;
import com.asran.user_service.event.UserRegisteredEvent;
import com.asran.user_service.producer.UserProducer;
import com.asran.user_service.repository.UserRepository;
import com.asran.user_service.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserProducer userProducer;
    private final JwtService jwtService;

    public String register(RegisterRequest request){

        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("Email Already Exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole("USER");

        userRepository.save(user);

        UserRegisteredEvent event =
                new UserRegisteredEvent(
                        user.getName(),
                        user.getEmail()
                );

        userProducer.sendEvent(event);

        return "User Registered Successfully";
    }

    public LoginResponse login(LoginRequest request){

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));

        if(!user.getPassword().equals(request.getPassword())){
            throw new RuntimeException("Wrong Password");
        }

        String token =
                jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                token,
                user.getName(),
                user.getEmail(),
                user.getRole()
        );

    }
    public List<User> getAllUsers(){

        return userRepository.findAll();
    }
}