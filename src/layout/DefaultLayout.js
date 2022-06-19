import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner, Toasts } from 'src/components'

const DefaultLayout = () => {
  const isShowSpinner = useSelector((state) => state.basic.isShowSpinner)
  const toast = useSelector((state) => state.basic.toast)
  const dispatch = useDispatch()

  useEffect(() => {
    if (toast.isShow) {
      setTimeout(() => {
        dispatch({ type: 'setBasic', toast: {
          isShow: false,
          type: '',
          msg: ''
        }});
      }, 3000)
    }
  }, [toast])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <Spinner visible={isShowSpinner} />
          <Toasts isShow={toast.isShow} msg={toast.msg} type={toast.type} />
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
