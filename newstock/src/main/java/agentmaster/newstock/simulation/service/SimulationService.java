package agentmaster.newstock.simulation.service;

import agentmaster.newstock.simulation.entity.Simulation;
import agentmaster.newstock.simulation.exception.NotSufficientBalanceException;
import agentmaster.newstock.simulation.exception.NotSufficientVolumeException;
import agentmaster.newstock.simulation.repository.SimulationRepository;
import agentmaster.newstock.simulation.request.SimulationRequest;
import agentmaster.newstock.simulation.response.SimulationDto;
import agentmaster.newstock.simulation.response.SimulationResponse;
import agentmaster.newstock.simulationstock.entity.SimulationStock;
import agentmaster.newstock.simulationstock.exception.StockNotExistException;
import agentmaster.newstock.simulationstock.repository.SimulationStockRepository;
import agentmaster.newstock.simulationstock.service.SimulationStockService;
import agentmaster.newstock.user.entitiy.User;
import agentmaster.newstock.user.exception.NotLoginException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import static agentmaster.newstock.simulation.service.SimulationStatusConstants.*;

@Service
@RequiredArgsConstructor
@Transactional
public class SimulationService {

    private final SimulationRepository simulationRepository;
    private final SimulationStockRepository simulationStockRepository;
    private final SimulationStockService simulationStockService;
    private final EntityManager entityManager;

    public SimulationResponse simulation(SimulationRequest simulationRequest, User user) {
        loginCheck(user);

        if (TYPE_BUY.equals(simulationRequest.getType())){
            BigDecimal needBalance = BigDecimal.valueOf(Double.valueOf(simulationRequest.getPrice()) * simulationRequest.getVolume());
            if (user.getAvailableAsset().compareTo(needBalance) < 0) {
                throw new NotSufficientBalanceException();
            }

            //이부분 먼저 저장을 하고 그 후에 수정을 해서 문제가 생기는게 아닐까 형코드를 자세히 아는 건 아니지만
            Simulation simulation = saveSimulation(simulationRequest, user);
            conclusionSimulation (simulation);

            return new SimulationResponse(simulation.getId());
        } else if (TYPE_SELL.equals(simulationRequest.getType())) {
            if (!simulationStockRepository.existsByUserAndStockCode(user, simulationRequest.getStockCode())) {
                throw new StockNotExistException();
            }

            SimulationStock simulationStock = simulationStockRepository.findByUserAndStockCode(user, simulationRequest.getStockCode());
            if (simulationStock.getVolume() - simulationRequest.getVolume() < 0) {
                throw new NotSufficientVolumeException();
            }

            Simulation simulation = saveSimulation(simulationRequest, user);
            conclusionSimulation (simulation);
            return new SimulationResponse(simulation.getId());
        }

        return null;
    }

    public Simulation saveSimulation(SimulationRequest simulationRequest, User user) {

        Simulation simulation = Simulation.builder()
                .stockName(simulationRequest.getStockName())
                .stockCode(simulationRequest.getStockCode())
                .type(simulationRequest.getType())
                .status(ORDER_STATUS_WAIT)
                .price(simulationRequest.getPrice())
                .volume(simulationRequest.getVolume())
                .user(user)
                .build();

        return simulationRepository.save(simulation);
    }

    public void conclusionSimulation(Simulation simulation) {
        entityManager.detach(simulation);
        Simulation findSimulation = simulationRepository.findByIdFetch(simulation.getId());
        findSimulation.changeStatus(ORDER_STATUS_CONCLUSION);



        if (TYPE_BUY.equals(simulation.getType())) {
            findSimulation.getUser().buy(simulation.getPrice(), simulation.getVolume());

            if (simulationStockRepository.existsByUserAndStockCode(simulation.getUser(), simulation.getStockCode())) {
                simulationStockRepository.findByUserAndStockCode(simulation.getUser(), simulation.getStockCode())
                        .change(simulation.getType(), simulation.getVolume(), simulation.getPrice(), findSimulation);

                return;

            }

            simulationStockService.saveSimulationStock(simulation);
        } else if (TYPE_SELL.equals(simulation.getType())) {
            findSimulation.getUser().sell(simulation.getPrice(), simulation.getVolume());

            SimulationStock simulationStock = simulationStockRepository.findByUserAndStockCode(simulation.getUser(), simulation.getStockCode());



            if (simulationStock.getVolume() - simulation.getVolume() > 0) {
                simulationStock.change(simulation.getType(), simulation.getVolume(), simulation.getPrice(), findSimulation);
                return;
            }

            simulationStockService.deleteSimulationStock(findSimulation.getUser(), findSimulation.getStockCode());
        }
    }

    public void cancelSimulation(Long simulationId, User user) {
        loginCheck(user);
        Simulation simulation = simulationRepository.findByIdFetch(simulationId);

        if (simulation.getStatus().equals(ORDER_STATUS_WAIT)) {
            simulation.changeStatus(ORDER_STATUS_CANCEL);
        }

        if (TYPE_BUY.equals(simulation.getType())) {
            simulation.getUser().sell(simulation.getPrice(), simulation.getVolume());
        }
    }

    public List<SimulationDto> getSimulations(User user, String status) {
        loginCheck(user);

        return simulationRepository.findByUserAndStatus(user,status)
                .stream()
                .map(SimulationDto::new)
                .collect(Collectors.toList());
    }

    public String getSimulationPrice(String price, Integer profit) {
        Integer result = Integer.valueOf(price) + Integer.valueOf(price) * profit / 100;
        return String.valueOf(result);
    }

    private void loginCheck(User user) {
        if (user == null) {
            throw new NotLoginException();
        }
    }
}
