package FindIt.DIT.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import FindIt.DIT.entity.ValidDitId;

@Repository
public interface ValidDitIdRepository extends JpaRepository<ValidDitId, Long> {
    Optional<ValidDitId> findByDitId(String ditId);
    boolean existsByDitId(String ditId);
}