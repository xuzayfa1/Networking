package org.example.appsmallcrm.repo;

import org.example.appsmallcrm.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    boolean existsUserByUsername(String username);
}
