import React from 'react'

function CardSkeleton() {
  return (
    <div>
      <div className="skeleton-contributor-card">
            <div id="short">
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
