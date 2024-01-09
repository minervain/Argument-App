package com.argument.aou.Email;

import com.argument.aou.Configuration.AouProperties;
import com.argument.aou.user.User;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailService {

    AouProperties aouProperties;

    public EmailService(AouProperties aouProperties) {
        this.aouProperties = aouProperties;
    }

    public JavaMailSender getJavaMailSender(){
        JavaMailSenderImpl mailSender=new JavaMailSenderImpl();
        mailSender.setHost(aouProperties.getEmail().host());
        mailSender.setPort(587);
        mailSender.setUsername(aouProperties.getEmail().username());
        mailSender.setPassword(aouProperties.getEmail().password());

        Properties properties=mailSender.getJavaMailProperties();
        properties.put("mail.smtp.starttls.enable","true");

        return mailSender;

    }


    public void sendActivationEmail(User user) {
        SimpleMailMessage message=new SimpleMailMessage();
        message.setFrom("noreply@my-app.com");
        message.setTo((user.getEmail()));
        message.setSubject("Account activation");
        message.setText("http://localhost:3000/activation/"+ user.getActivationToken());
        getJavaMailSender().send(message);
    }

}
