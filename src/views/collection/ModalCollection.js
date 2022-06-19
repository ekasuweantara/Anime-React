import React, { useEffect, useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CRow
} from "@coreui/react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux'

const ModalAddCollection = ({ 
  isShowModal, 
  onConfirm, 
  onCancel, 
  collection 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const dispatch = useDispatch();
  const collectionsList = useSelector((state) => state.collections.collections)
  const [isDuplicate, setIsDuplicate] = useState(false)
  const [collectionName, setCollectionName] = useState(collection)

  useEffect(() => {
    reset()
    setCollectionName(collection)
  }, [collection, isShowModal])

  const onSubmit = (data) => {
    const newCollection = collectionsList.find(item => item.name === data.collection.trim())
    if (!newCollection && !collection) { // add new
      dispatch({ type: 'addCollection', payload: {
        name: data.collection.trim(),
        data: []
      }})
      onConfirm()
    } else if (!newCollection && collection) { // update
      dispatch({ type: 'updateCollection', payload: {
        name: collection,
        newName: data.collection.trim(),
      }})
      onConfirm(data.collection.trim())
    } else if (data.collection === collection) { // collection not change
      onCancel()
    } else {
      setIsDuplicate(true)
    }
    reset()
  }

  return (
    <>
      <CModal
        alignment="center"
        visible={isShowModal}
      >
        <CForm
          className="g-3 needs-validation"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CModalHeader closeButton={false}>
            <CModalTitle>Add New Collection</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol md={12}>
                <CFormLabel htmlFor="collection-name">Collection Name</CFormLabel>
                <CFormInput 
                  type="text" 
                  id="collection-name" 
                  placeholder="Type new collection here"
                  value={collectionName}
                  onInput={(e) => {
                    setCollectionName(e.target.value)
                    setIsDuplicate(false)
                  }}
                  {...register("collection", {
                    required: true,
                    pattern: /^[A-Za-z0-9\d\-_\s]+$/i,
                    duplicate: true
                  })} />
                  {errors?.collection?.type === "required" && <p className="p-error">This field is required</p>}
                  {errors?.collection?.type === "pattern" && (
                    <p className="p-error">Special characters are not allowed</p>
                  )}
                  {isDuplicate && (
                    <p className="p-error">Collection already added</p>
                  )}
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => {
              onCancel()
              reset()
            }}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              Submit form
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  );
};

export default ModalAddCollection;

ModalAddCollection.propTypes = {
  collection: PropTypes.string,
  isShowModal: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};
