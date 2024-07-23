import React from 'react'

function CardSkeleton({theme}) {
  return (
    <div>
      <div className={`${theme?"bg-sky-300":"bg-black"} skeleton-contributor-card`}>
            <div className={`${theme?"bg-sky-100":"bg-zinc-900"} short`}>
              <div className="skeleton-avatar"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
              <div className="skeleton-icons">
                <div className="skeleton-icon"></div>
                <div className="skeleton-icon"></div>
                <div className="skeleton-icon"></div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default CardSkeleton