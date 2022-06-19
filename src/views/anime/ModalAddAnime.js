import React, { useEffect, useState } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormSelect,
  CForm,
  CFormFeedback
} from '@coreui/react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const ModalAddAnime = ({ visible, setVisible, addAnimeToCollection, id }) => {
  const collectionsList = useSelector((state) => state.collections.collections)
  const [collectionName, setCollectionName] = useState("")
  const [validated, setValidated] = useState(false)

  // useEffect(() => {
  //   if (visible) {
  //     setCollectionName("")
  //   }
  // }, [visible]);

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      if (collectionsList && collectionsList.length === 0) {
        addAnimeToCollection("New Collection")
      } else {
        addAnimeToCollection(collectionName)
      }
    }
    setValidated(true)
    event.preventDefault();
  }

  // const filterCollection = () => {
  //   const newCollectionList = collectionsList.filter(item => {
  //     const media = item.data.find(media => media.id === id )
  //     if (media) return false;
  //     else return true;
  //   });
  //   return newCollectionList
  // }

  const selectCollection = () => {
    return (
      <>
        <CFormSelect 
          value={collectionName}
          required
          onChange={(e) => setCollectionName(e.target.value)}>
          <option value="">Select Collection</option>
          {
            collectionsList.map((item, index) => {
              return <option value={item.name} key={index}>{item.name}</option>
            })
          }
        </CFormSelect>
        <CFormFeedback invalid>This field is required.</CFormFeedback>
      </>
    )
  }

  const emptyCollection = () => {
    return (
      <>
        Oopss, Looks like you don't have a collection yet. Do you want to create a collection with the name <span className="text-decoration-underline">New Collection</span>?
      </>
    )
  }

  return (
    <>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CForm
          className="g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CModalHeader>
            <CModalTitle>Add Anime to Collection</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {
              collectionsList.length === 0 ? emptyCollection() : selectCollection()
            }
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" type="submit">Submit</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default ModalAddAnime

ModalAddAnime.propTypes = {
  id: PropTypes.number,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  addAnimeToCollection: PropTypes.func
}
