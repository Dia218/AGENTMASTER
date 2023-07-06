import React from 'react';

function Table() {
  const data = [
    { id: 1, name: '전일', price: 7730},
    { id: 2, name: '고가', price: 9630},
    { id: 3, name: '거래량', price: 39193815},
    { id: 4, name: '시가', price: 7930},
    { id: 5, name: '저가', price: 7930},
    { id: 6, name: '거래대금', price: "349,695백만"},
  ];
  const rows = [];
  for (let i = 0; i < data.length; i += 3) {
    rows.push(
      <tr key={i}>
        {data.slice(i, i + 3).map((item, index) => (
          <React.Fragment key={item.id}>
           
            <td>{item.name}</td>
            <td>{item.price}</td>
           
          </React.Fragment>
        ))}
      </tr>
    );
  }

  return (
    <div className='table-container'>
    <table className='custom-table'>
      
      <tbody>{rows}</tbody>
    </table>
    </div>
  );
}

export default Table;