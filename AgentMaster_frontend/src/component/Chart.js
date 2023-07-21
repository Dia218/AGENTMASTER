//주식 차트를 출력하는 컴포넌트.
//props로 데이터를 넘겨받으면 해당 데이터로 테이블을 작성한다.

import { useTable } from "react-table";
import './css/Chart.css';

function Chart({columns, data}) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

    return (
        <div className="chart">
            <table className="table" {...getTableProps()}>
                <thead className="">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((columns) => (
                                <th {...columns.getHeaderProps()}>{columns.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="" {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return(
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
  }
  
  export default Chart;