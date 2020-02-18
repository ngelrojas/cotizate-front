import React from 'react'
import {Link} from 'react-router-dom'
import {MdClear, MdCreate} from 'react-icons/md'

export const TableReward = ({data}) => {
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
          <tr>
            <td>{data.title_reward}</td>
            <td>{data.price_reward}</td>
            <td>{data.currencies}</td>
            <td>
              <Link to="#">
                <MdCreate />
              </Link>
            </td>
            <td>
              <Link to="#">
                <MdClear />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
