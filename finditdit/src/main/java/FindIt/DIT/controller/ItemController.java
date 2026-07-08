package FindIt.DIT.controller;

import FindIt.DIT.dto.ItemRequest;
import FindIt.DIT.dto.MessageResponse;
import FindIt.DIT.entity.Item;
import FindIt.DIT.entity.User;
import FindIt.DIT.enums.ItemStatus;
import FindIt.DIT.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody ItemRequest request,
                                           @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(itemService.createItem(request, user));
    }

    @GetMapping("/browse")
    public ResponseEntity<List<Item>> browse(@RequestParam(required = false) String status) {
        if (status != null) {
            return ResponseEntity.ok(itemService.getItemsByStatus(ItemStatus.valueOf(status)));
        }
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Item>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(itemService.searchItems(keyword));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItem(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id,
                                           @RequestBody ItemRequest request,
                                           @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(itemService.updateItem(id, request, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteItem(@PathVariable Long id,
                                                      @AuthenticationPrincipal User user) {
        itemService.deleteItem(id, user);
        return ResponseEntity.ok(new MessageResponse("Item deleted successfully"));
    }
}