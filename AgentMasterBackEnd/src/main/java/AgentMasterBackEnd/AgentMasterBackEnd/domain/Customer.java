package AgentMasterBackEnd.AgentMasterBackEnd.domain;

import lombok.Data;

@Data
public class Customer {
    private String customerId;
    private String customerPassword;
    private String customerEMail;
}
