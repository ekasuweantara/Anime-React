import React from 'react'
import { CSpinner, CModalBody } from '@coreui/react'
import PropTypes from 'prop-types'
import { CModalSpinner } from './Style'

const Spinner = ({ visible }) => {
  return (
    <>
      <CModalSpinner alignment="center" visible={visible}>
        <CModalBody className="text-center">
          <CSpinner color="primary" />
        </CModalBody>
      </CModalSpinner>
    </>
  )
}

export default Spinner

Spinner.propTypes = {
  visible: PropTypes.bool
}
