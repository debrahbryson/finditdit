package FindIt.DIT.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import FindIt.DIT.entity.Item;
import FindIt.DIT.enums.ItemStatus;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByStatus(ItemStatus status);
    List<Item> findByPostedById(Long userId);
    List<Item> findByCategoryAndStatus(String category, ItemStatus status);
    List<Item> findByLocationAndStatus(String location, ItemStatus status);
    List<Item> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);
}