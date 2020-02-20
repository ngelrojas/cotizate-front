import React from 'react'
import {Link} from 'react-router-dom'
import {MdClear, MdCreate} from 'react-icons/md'

export const TableReward = ({rewards}) => {
  function deleteReward(id) {
    console.log(id)
  }
  return (
    <div className="list-rewards col-md-6">
      <h6>LISTA DE PREMIOS</h6>
      <table className="table">
        <thead>
          <tr>
            <td>TITULO</td>
            <td>VALOR</td>
            <td>MONEDA</td>
            <td colSpan="2">&nbsp;</td>
            <td>&nbsp;</td>
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
                  <Link to={`${reward.id}`}>
                    <MdCreate />
                  </Link>
                </td>
                <td>
                  <Link to="#" onClick={deleteReward(reward.id)}>
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
