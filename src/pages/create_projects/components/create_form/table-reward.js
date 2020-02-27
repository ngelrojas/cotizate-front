import React from 'react'

export const TableReward = ({rewards}) => {
  return (
    <div className="list-rewards col-md-6">
      <h6>LISTA DE PREMIOS</h6>
      <table className="table">
        <thead>
          <tr>
            <td>TITULO</td>
            <td>VALOR</td>
            <td>MONEDA</td>
            <td>TIPO</td>
            <td>FECHA</td>
          </tr>
        </thead>
        <tbody>
          {rewards &&
            rewards.map(reward => (
              <tr key={reward.id}>
                <td>{reward.title}</td>
                <td>{reward.price}</td>
                <td>{reward.currencies === 1 ? 'Bolivianos' : 'Dolares'}</td>
                <td>
                  {reward.type_reward === 1 ? 'Donacion' : 'Contribucion'}
                </td>
                <td>{`${new Date(reward.delivery_data).toDateString()}`}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
