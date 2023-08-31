//주식 차트를 출력하는 컴포넌트.
//props로 데이터를 넘겨받으면 해당 데이터로 테이블을 작성한다.

import './css/Chart.css';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom/dist";

function Chart({columns, data}) {
    const addComma = (num) => {     //현재가, 전일비 값을 불러올 때 자동으로 3자리 마다 콤마(,)를 붙이는 코드
        let returnString = num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return(returnString)
    } 
    const chartData = [
        { name: "카나리아 바이오 주식회사", price: 1000.00, compare: +100, Fluctuations: +8.47 },
        { name: "종목2", price: 1294.00, compare: -250, Fluctuations: -9.00 },
        { name: "종목3", price: 3021.12, compare: +250, Fluctuations: +12.34 },
        { name: "종목4", price: 23400, compare: -330, Fluctuations: -12.78 },
      ];
    return (
        
            <div className="newsMain_chart">
                <table className="newsMain_table">
                    <thead>
                        <tr className="newsMain_chart_title">
                            <th className='newsMain_chart_titlehead_name'>종목명</th>
                            <th className='newsMain_chart_titlehead'>현재가</th>
                            <th className='newsMain_chart_titlehead'>전일비</th>
                            <th className='newsMain_chart_titlehead'>등락률</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chartData.map((data, index) => (
                            <tr className="newsMain_chart_row" key={index + 1}>
                            <td className='newsMain_chart_rowdata'>
                                <Link className="newsMain_chart_a" to={"/chartDetail?keyword="+ data.name}>
                                {data.name}
                                </Link>
                            </td>
                            <td className='newsMain_chart_rowdata'>{addComma(data.price)}</td>
                            <td className='newsMain_chart_rowdata'>{data.compare<0?addComma(data.compare):"+"+addComma(data.compare)}</td>
                            <td className='newsMain_chart_rowdata'>{data.Fluctuations<0?data.Fluctuations:"+"+data.Fluctuations}%</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        
    );
  }
  
  export default Chart;