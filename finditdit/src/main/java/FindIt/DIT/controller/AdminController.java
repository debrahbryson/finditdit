package FindIt.DIT.controller;

import FindIt.DIT.dto.MessageResponse;
import FindIt.DIT.entity.User;
import FindIt.DIT.entity.ValidDitId;
import FindIt.DIT.enums.Role;
import FindIt.DIT.repository.ItemRepository;
import FindIt.DIT.repository.UserRepository;
import FindIt.DIT.repository.ValidDitIdRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.opencsv.CSVReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final ValidDitIdRepository validDitIdRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    public AdminController(ValidDitIdRepository validDitIdRepository,
                           UserRepository userRepository,
                           ItemRepository itemRepository) {
        this.validDitIdRepository = validDitIdRepository;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
    }

    @PostMapping("/upload-ids")
    public ResponseEntity<MessageResponse> uploadIds(@RequestParam("file") MultipartFile file) {
        try {
            CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()));
            String[] line;
            int count = 0;
            while ((line = reader.readNext()) != null) {
                String ditId = line[0].trim();
                String type = line[1].trim().toUpperCase();
                if (!validDitIdRepository.existsByDitId(ditId)) {
                    ValidDitId validId = new ValidDitId(ditId, Role.valueOf(type));
                    validDitIdRepository.save(validId);
                    count++;
                }
            }
            return ResponseEntity.ok(new MessageResponse(count + " IDs uploaded successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to upload IDs: " + e.getMessage()));
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Long>> getDashboard() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalItems", itemRepository.count());
        stats.put("validIds", validDitIdRepository.count());
        return ResponseEntity.ok(stats);
    }
}