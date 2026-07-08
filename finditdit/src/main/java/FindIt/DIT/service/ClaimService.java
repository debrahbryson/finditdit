package FindIt.DIT.service;

import FindIt.DIT.dto.ClaimRequest;
import FindIt.DIT.entity.Claim;
import FindIt.DIT.entity.Item;
import FindIt.DIT.entity.User;
import FindIt.DIT.enums.ItemStatus;
import FindIt.DIT.repository.ClaimRepository;
import FindIt.DIT.repository.ItemRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClaimService {

    private final ClaimRepository claimRepository;
    private final ItemRepository itemRepository;
    private final NotificationService notificationService;

    public ClaimService(ClaimRepository claimRepository,
                        ItemRepository itemRepository,
                        NotificationService notificationService) {
        this.claimRepository = claimRepository;
        this.itemRepository = itemRepository;
        this.notificationService = notificationService;
    }

    public Claim createClaim(ClaimRequest request, User claimedBy) {
        Item item = itemRepository.findById(request.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (claimRepository.existsByItemIdAndClaimedById(item.getId(), claimedBy.getId())) {
            throw new RuntimeException("You have already claimed this item");
        }

        Claim claim = new Claim(item, claimedBy, request.getMessage());
        claimRepository.save(claim);

        notificationService.sendNotification(
                item.getPostedBy(),
                claimedBy.getFullName() + " has claimed your item: " + item.getTitle()
        );

        return claim;
    }

    public List<Claim> getClaimsForItem(Long itemId) {
        return claimRepository.findByItemId(itemId);
    }

    public List<Claim> getMyСlaims(Long userId) {
        return claimRepository.findByClaimedById(userId);
    }

    public Claim updateClaimStatus(Long claimId, String status, User user) {
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new RuntimeException("Claim not found"));

        if (!claim.getItem().getPostedBy().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        claim.setStatus(status);
        claimRepository.save(claim);

        if (status.equals("ACCEPTED")) {
            Item item = claim.getItem();
            item.setStatus(ItemStatus.CLAIMED);
            itemRepository.save(item);

            notificationService.sendNotification(
                    claim.getClaimedBy(),
                    "Your claim for \"" + item.getTitle() + "\" has been accepted!"
            );
        } else if (status.equals("REJECTED")) {
            notificationService.sendNotification(
                    claim.getClaimedBy(),
                    "Your claim for \"" + claim.getItem().getTitle() + "\" was rejected."
            );
        }

        return claim;
    }
}