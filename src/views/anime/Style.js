import styled from 'styled-components';
import { CCard, CButton, CAccordionHeader } from '@coreui/react'

export const CardImage = styled.div`
  background-size: cover;
  overflow: hidden;
  position: relative;
  width: auto;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 21 / 15%);
`;

export const CardImageEpisode = styled.div`
  background-size: cover;
  overflow: hidden;
  position: relative;
  width: auto;
  height: 180px;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 21 / 15%);
`;

export const ReviewerAvatar = styled.div`
  background-size: cover;
  overflow: hidden;
  position: relative;
  width: auto;
  height: 230px;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 21 / 15%);
`;

export const Card = styled(CCard)`
  width: auto;
  maxWidth: 18rem;
  border: 0px !important;
  background-color: transparent !important;
`;

export const ButtonGenre = styled(CButton)`
  padding: 2px 7px;
  margin: 2px;
  font-size: 10px;
  width: fit-content;
`;

export const ImageBaner = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  position: relative;
  width: auto;
  height: 400px;
`;

export const AccordionHeader = styled(CAccordionHeader)`
  > button {
    padding: 4px 7px;
  }
`;
