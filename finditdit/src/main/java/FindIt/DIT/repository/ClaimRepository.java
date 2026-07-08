package FindIt.DIT.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import FindIt.DIT.entity.Claim;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByItemId(Long itemId);
    List<Claim> findByClaimedById(Long userId);
    boolean existsByItemIdAndClaimedById(Long itemId, Long userId);
}