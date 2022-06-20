import styled from 'styled-components';
import { CRow, CCard } from '@coreui/react'

export const RowButton = styled(CRow)`
    margin-bottom: -40px !important;
    margin-right: -7px !important;
`;

export const CardImage = styled.div`
  background-size: cover;
  overflow: hidden;
  position: relative;
  width: auto;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 21 / 15%);
  @media (max-width: 480px) {
    height: 300px;
  }
`;

export const Card = styled(CCard)`
  width: auto;
  maxWidth: 18rem;
  border: 0px !important;
  background-color: transparent !important;
`;
