import React, { useEffect, useState } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import PropTypes from 'prop-types'

const ConfirmationModal = ({
  confirmModal,
  onConfirm,
  onCancel
}) => {
  return (
    <>
      <CModal 
        alignment="center" 
        visible={confirmModal?.isShow} 
        onClose={() => onCancel()}>
        <CModalHeader>
          <CModalTitle>{confirmModal?.title}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {confirmModal?.msg}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={onConfirm}>Yes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ConfirmationModal

ConfirmationModal.propTypes = {
  confirmModal: PropTypes.object,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
}
