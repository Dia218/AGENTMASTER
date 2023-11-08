package agentmaster.newstock.etc;

import java.util.ArrayList;
import java.util.List;

public class Company {
    private List<List<String>> companylist;
    public Company(){
        companylist = new ArrayList<>();

        List<String> energy = new ArrayList<>();
        List<String> materials = new ArrayList<>();
        List<String> industrial = new ArrayList<>();
        List<String> utilities = new ArrayList<>();
        List<String> healthcare = new ArrayList<>();
        List<String> financials = new ArrayList<>();
        List<String> consumer = new ArrayList<>();
        List<String> staples = new ArrayList<>();
        List<String> ICT = new ArrayList<>();
        List<String> RealEstate = new ArrayList<>();

        energy.add("한화솔루션");
        energy.add("HD현대에너지솔루션");
        energy.add("씨에스윈드");
        energy.add("대명에너지");

        materials.add("KCC");
        materials.add("쌍용C&E");
        materials.add("동화기업");
        materials.add("한일시멘트");

        industrial.add("한화에어로스페이스");
        industrial.add("한국항공우주");
        industrial.add("한화시스템");
        industrial.add("LIG넥스원");

        utilities.add("한국전력");
        utilities.add("한국가스공사");
        utilities.add("SK가스");
        utilities.add("지역난방공사");

        healthcare.add("셀트리온");
        healthcare.add("클래시스");
        healthcare.add("삼성바이오로직스");
        healthcare.add("한미약품");

        financials.add("KB금융");
        financials.add("카카오뱅크");
        financials.add("DB손해보험");
        financials.add("리드코프");

        consumer.add("영원무역홀딩스");
        consumer.add("신세계푸드");
        consumer.add("현대백화점");
        consumer.add("롯데쇼핑");

        staples.add("CJ제일제당");
        staples.add("오리온");
        staples.add("하이트진로");
        staples.add("KT&G");

        ICT.add("삼성에스디에스");
        ICT.add("포스코DX");
        ICT.add("펄어비스");
        ICT.add("카카오");
        ICT.add("KT");
        ICT.add("하이브");
        ICT.add("LG유플러스");
        ICT.add("SK텔레콤");

        RealEstate.add("롯데리츠");
        RealEstate.add("SK리츠");
        RealEstate.add("제이알글로벌리츠");
        RealEstate.add("한화리츠");

        this.companylist.add(energy);
        this.companylist.add(materials);
        this.companylist.add(industrial);
        this.companylist.add(utilities);
        this.companylist.add(healthcare);
        this.companylist.add(financials);
        this.companylist.add(consumer);
        this.companylist.add(staples);
        this.companylist.add(ICT);
        this.companylist.add(RealEstate);
    }

    public List<List<String>> getList(){
        return this.companylist;
    }
}
