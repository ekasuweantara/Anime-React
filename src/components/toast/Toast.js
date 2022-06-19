import React from 'react'
import { CToastBody, CToastClose } from '@coreui/react'
import PropTypes from 'prop-types'
import { CToastAnime } from './Style'

const Toasts = ({ isShow, msg, type }) => {
  return (
    <>
      <CToastAnime
        autohide={false}
        color={type}
        className="text-white align-items-center position-fixed"
        visible={isShow}
      >
        <div className="d-flex">
          <CToastBody>{ msg }</CToastBody>
          <CToastClose className="me-2 m-auto" white />
        </div>
      </CToastAnime>
    </>
  )
}

export default Toasts

Toasts.propTypes = {
  isShow: PropTypes.bool,
  msg: PropTypes.string,
  type: PropTypes.string
}
