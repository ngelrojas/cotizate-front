import React from 'react'
import {Link} from 'react-router-dom'
import {MdCreate, MdClear} from 'react-icons/md'

export const TableReward = ({rewards, reward_btn, reward_del}) => {
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
            <td colSpan="2"></td>
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
                <td colSpan="2" className="btn-group">
                  <Link
                    to={`/project/update/${reward.campaing}`}
                    className="btn btn-sm btn-outline-info"
                    onClick={() => reward_btn(reward.id)}>
                    <MdCreate />
                  </Link>
                  <Link
                    className="btn btn-sm btn-outline-danger"
                    to="#"
                    onClick={() => reward_del(reward.id)}>
                    <MdClear />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
