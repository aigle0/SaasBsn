package com.bsn.beta;

import com.bsn.beta.role.Role;
import com.bsn.beta.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
//cause added @EntityListeners(AuditingEntityListener.class) in User,Book,Feedback...
//added auditorAwareRef to use the bean auditorAware in BeansConfig
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync // cause do not block the user until receiving the email com/bsn/beta/email/EmailService.java:28
public class BsnBetaApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BsnBetaApiApplication.class, args);
	}

    @Bean
    public CommandLineRunner runner(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.findByName("USER").isEmpty()){
                roleRepository.save(Role.builder().name("USER").build());
            }
        };
    }
}
