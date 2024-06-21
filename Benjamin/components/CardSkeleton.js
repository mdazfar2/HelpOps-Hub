import React from 'react'

function CardSkeleton() {
  return (
    <div>
      <div class="skeleton-contributor-card">
            <div id="short">
              <div class="skeleton-avatar"></div>
              <div class="skeleton-text"></div>
              <div class="skeleton-text short"></div>
              <div class="skeleton-icons">
                <div class="skeleton-icon"></div>
                <div class="skeleton-icon"></div>
                <div class="skeleton-icon"></div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default CardSkeleton
