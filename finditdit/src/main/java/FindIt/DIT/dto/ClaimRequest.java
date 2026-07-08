package FindIt.DIT.dto;

public class ClaimRequest {
    private Long itemId;
    private String message;

    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}