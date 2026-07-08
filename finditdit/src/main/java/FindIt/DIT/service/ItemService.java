package FindIt.DIT.service;

import FindIt.DIT.dto.ItemRequest;
import FindIt.DIT.entity.Item;
import FindIt.DIT.entity.User;
import FindIt.DIT.enums.ItemStatus;
import FindIt.DIT.repository.ItemRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Item createItem(ItemRequest request, User user) {
        Item item = new Item(
                request.getTitle(),
                request.getDescription(),
                request.getCategory(),
                request.getLocation(),
                request.getImageUrl(),
                ItemStatus.valueOf(request.getStatus()),
                user
        );
        return itemRepository.save(item);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public List<Item> getItemsByStatus(ItemStatus status) {
        return itemRepository.findByStatus(status);
    }

    public List<Item> searchItems(String keyword) {
        return itemRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword);
    }

    public Item getItemById(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
    }

    public Item updateItem(Long id, ItemRequest request, User user) {
        Item item = getItemById(id);
        if (!item.getPostedBy().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        item.setTitle(request.getTitle());
        item.setDescription(request.getDescription());
        item.setCategory(request.getCategory());
        item.setLocation(request.getLocation());
        item.setImageUrl(request.getImageUrl());
        item.setStatus(ItemStatus.valueOf(request.getStatus()));
        return itemRepository.save(item);
    }

    public void deleteItem(Long id, User user) {
        Item item = getItemById(id);
        if (!item.getPostedBy().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        itemRepository.delete(item);
    }
}