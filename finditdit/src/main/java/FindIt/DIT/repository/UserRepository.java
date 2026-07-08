package FindIt.DIT.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import FindIt.DIT.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByDitId(String ditId);
    boolean existsByEmail(String email);
    boolean existsByDitId(String ditId);
}