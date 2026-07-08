package FindIt.DIT.controller;

import FindIt.DIT.dto.ClaimRequest;
import FindIt.DIT.entity.Claim;
import FindIt.DIT.entity.User;
import FindIt.DIT.service.ClaimService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "*")
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @PostMapping
    public ResponseEntity<Claim> createClaim(@RequestBody ClaimRequest request,
                                             @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(claimService.createClaim(request, user));
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity<List<Claim>> getClaimsForItem(@PathVariable Long itemId) {
        return ResponseEntity.ok(claimService.getClaimsForItem(itemId));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Claim>> getMyClaims(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(claimService.getMyСlaims(user.getId()));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Claim> updateStatus(@PathVariable Long id,
                                              @RequestParam String status,
                                              @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(claimService.updateClaimStatus(id, status, user));
    }
}