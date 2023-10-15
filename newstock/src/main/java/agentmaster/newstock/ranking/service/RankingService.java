package agentmaster.newstock.ranking.service;

import agentmaster.newstock.ranking.dto.RankingResponse;
import agentmaster.newstock.simulationstock.entity.SimulationStock;
import agentmaster.newstock.simulationstock.repository.SimulationStockRepository;
import agentmaster.newstock.user.entitiy.User;
import agentmaster.newstock.user.repository.UserRepository;
import agentmaster.newstock.user.repository.UserRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RankingService {

    private final UserRepository userRepository;
    private final StockRepository stockRepository;
    private final SimulationStockRepository simulationStockRepository;

    public List<RankingResponse> getRankings() {
        return userRepository.findAllFetchByRankings()
                .stream()
                .map(RankingResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void initRankings() {
        List<StockDto> stocks = stockRepository.findAll();
        List<User> users = userRepository.findAllFetchByRankings();

        for (User user : users) {
            BigDecimal tradePrice = BigDecimal.valueOf(0);
            BigDecimal presentPrice = BigDecimal.valueOf(0);

            List<SimulationStock> simulationStocks = simulationStockRepository.findByUser(user);
            for (SimulationStock simulationStock : simulationStocks) {
                tradePrice = tradePrice.add(BigDecimal.valueOf(Double.parseDouble(simulationStock.getPrice()) * simulationStock.getVolume()));
                for (StockDto stockDto : stocks) {
                    if (stockDto.getStockCode().equals(simulationStock.getStockCode())) {
                        presentPrice = presentPrice.add(stockDto.getTradePrice().multiply(BigDecimal.valueOf(simulationStock.getVolume())));
                    }
                }
            }

            Double result = presentPrice.compareTo(BigDecimal.valueOf(0)) == 0 ? 0.0 : presentPrice.subtract(tradePrice).doubleValue();
            Double profit = presentPrice.compareTo(BigDecimal.valueOf(0)) == 0 ? 0.0 : (result / tradePrice.doubleValue()) * 100.0;

            user.getRanking().changeProfit(profit);
        }

        users.sort((o1, o2) -> {
            if (o1.getRanking().getProfit() < o2.getRanking().getProfit()) {
                return 1;
            } else if (o1.getRanking().getProfit() > o2.getRanking().getProfit()) {
                return -1;
            }
            return 0;
        });

        for (int i = 0; i < users.size(); i++) {
            users.get(i).getRanking().changeRank(i + 1);
        }
    }
}
