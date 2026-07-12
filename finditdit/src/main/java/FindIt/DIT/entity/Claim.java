package FindIt.DIT.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "claims")
public class Claim extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item_id", nullable = false)
    @JsonIgnoreProperties({"password", "ditId", "verified", "createdAt"})
    private Item item;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "claimed_by", nullable = false)
    @JsonIgnoreProperties({"password", "ditId", "verified", "createdAt"})
    private User claimedBy;

    @Column(nullable = false, length = 1000)
    private String message;

    @Column(nullable = false)
    private String status = "PENDING";

    // Default constructor
    public Claim() {}

    // Parameterized constructor
    public Claim(Item item, User claimedBy, String message) {
        this.item = item;
        this.claimedBy = claimedBy;
        this.message = message;
        this.status = "PENDING";
    }

    // Getters and Setters
    public Item getItem() { return item; }
    public void setItem(Item item) { this.item = item; }

    public User getClaimedBy() { return claimedBy; }
    public void setClaimedBy(User claimedBy) { this.claimedBy = claimedBy; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}