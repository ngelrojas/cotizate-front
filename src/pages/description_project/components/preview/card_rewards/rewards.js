import React from 'react'
import BtnStripe from '../../../../components/btnstripe/BtnStripe.Component'

export default function RewardCard({reward}) {
  return (
    <div>
      <div className="box-contributions box-reward">
        <div className="box-contributions-general">
          <h5 className="box-ctb-txt d-flex justify-content-center reward-title">
            {reward.title}
          </h5>
          <div className="row">
            <div className="col-6 box-contributions-1">
              <span>
                {`${reward.price} ${reward.currencies === 1 ? '$BS' : '$USD'}`}{' '}
              </span>
            </div>

            <div className="col-12 box-contributions-3">
              <div
                className="preview-p"
                dangerouslySetInnerHTML={{
                  __html: reward.description,
                }}></div>
            </div>
            <div className="col-12 box-contributions-bnt d-flex justify-content-center">
              <BtnStripe
                symbol={reward.currencies === 1 ? '$Bs' : '$Usd'}
                price={reward.price}
                campaingid={reward.campaing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
