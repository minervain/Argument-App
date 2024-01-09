package com.argument.aou.dto;

import com.argument.aou.user.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserCreate(
        @NotBlank
        @Size(min = 4 ,max=255)
        String username,
        @NotBlank
        @Email
        String email,
        @Size(min = 8 ,max=255)
        String password
) {
    public User toUser(){
        User user=new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(password);
        return user;
    }
}
