import React from 'react'

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
              <button className="btn btn-success btn-sm btn-contributions">
                CONTRIBUIR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
