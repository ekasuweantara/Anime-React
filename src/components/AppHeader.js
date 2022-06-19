import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
import { AnimeSpan, NameSpan } from './Style'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.basic.sidebarShow)

  const textTitle = () => {
    return (
      <>
        <AnimeSpan>ANIME</AnimeSpan>|<NameSpan>EKA</NameSpan>
      </>
    )
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer md>
        <CHeaderBrand className="d-none d-md-flex" to="/">
          {textTitle()}
        </CHeaderBrand>
        <CHeaderToggler
          className="ps-1 d-md-none"
          onClick={() => dispatch({ type: 'setBasic', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {textTitle()}
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex ml-auto">
          <CNavItem>
            <CNavLink to="/" component={NavLink}>
              Anime
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/collection" component={NavLink}>Collections</CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
