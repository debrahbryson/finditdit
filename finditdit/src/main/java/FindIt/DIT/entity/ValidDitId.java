package FindIt.DIT.entity;

import FindIt.DIT.enums.Role;
import jakarta.persistence.*;

@Entity
@Table(name = "valid_dit_ids")
public class ValidDitId extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String ditId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role idType;

    @Column(nullable = false)
    private boolean used = false;

    // Default constructor
    public ValidDitId() {}

    // Parameterized constructor
    public ValidDitId(String ditId, Role idType) {
        this.ditId = ditId;
        this.idType = idType;
        this.used = false;
    }

    // Getters and Setters
    public String getDitId() { return ditId; }
    public void setDitId(String ditId) { this.ditId = ditId; }

    public Role getIdType() { return idType; }
    public void setIdType(Role idType) { this.idType = idType; }

    public boolean isUsed() { return used; }
    public void setUsed(boolean used) { this.used = used; }
}