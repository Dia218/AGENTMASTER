package AgentMasterBackEnd.AgentMasterBackEnd.service;

import AgentMasterBackEnd.AgentMasterBackEnd.domain.Customer;
import org.springframework.stereotype.Service;

public interface MemberService {
    boolean loginMember(Customer customer);

    boolean searchMember(Customer customer);

    void joinMember(Customer customer);

    void updateMember(Customer customer);
}
