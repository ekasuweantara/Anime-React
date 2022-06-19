import styled from 'styled-components';
import { CModal } from '@coreui/react'

export const CModalSpinner = styled(CModal)`
  > .modal-dialog{
    > .modal-content{
      border: 0px !important;
      background-color: transparent !important;
    }
  }
`
