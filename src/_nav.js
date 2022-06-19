import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilLibrary, cilFile } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Anime',
    to: '/anime',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Collection',
    to: '/collection',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
  },
]

export default _nav
