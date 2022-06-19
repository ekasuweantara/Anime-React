const initialState = {
  sidebarShow: false,
  isShowSpinner: false,
  toast: {
    isShow: false,
    type: '',
    msg: ''
  }
}

const reducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'setBasic':
      return { ...state, ...rest }
    default:
      return state
  }
}

export default reducer
