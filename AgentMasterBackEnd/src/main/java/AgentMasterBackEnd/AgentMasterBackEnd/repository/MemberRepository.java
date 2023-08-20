package AgentMasterBackEnd.AgentMasterBackEnd.repository;

import java.lang.reflect.Member;
import java.util.List;

public interface MemberRepository {
    public List<Member> findMember();

    public List<Member> findMemberId();

    public void saveMember(Member member);

    public void changeMember(Member member);
}
