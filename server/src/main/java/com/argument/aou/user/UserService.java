package com.argument.aou.user;

import com.argument.aou.Email.EmailService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional(rollbackOn = MailException.class)
    void save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActivationToken(UUID.randomUUID().toString());
        userRepository.saveAndFlush(user);
        emailService.sendActivationEmail(user);
    }
}
