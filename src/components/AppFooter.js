import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="bg-white">
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          Anime
        </a>
        <span className="ms-1">&copy; 2022</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.tokopedia.com/" target="_blank" rel="noopener noreferrer" style={{color: '#03ac0e'}}>
          Tokopedia
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
