import React, {useState} from 'react'

import {
  CCardBody,
  CButton,
  CCol,
  CRow,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { RowButton, CardImage, Card } from './Style'
import { ConfirmationModal } from 'src/components'
import ModalAddCollection from './ModalCollection'

const Collection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModalCollection, setShowModalCollection] = useState(false)
  const [collectionName, setCollectionName] = useState("");
  const [confirmModal, setConfirmModal] = useState({
    isShow: false,
    title: 'Confirmation Delete',
    msg: 'Are you sure to delete this collection?'
  });
  const collectionsList = useSelector((state) => state.collections.collections)

  const findImage = (item) =>{
    return item?.data?.length > 0 ? item.data[0]?.coverImage?.large : "/default.jpeg";
  }

  const deleteCollection = (name) => {
    setCollectionName(name)
    setConfirmModal(current => ({
      ...current, isShow: true
    }))
  }
  
  const onCancelDelete = () => {
    setConfirmModal(current => ({
      ...current, isShow: false
    }))
  }
  
  const onConfirmDelete = () => {
    dispatch({ type: 'deleteCollection', payload: {
      name: collectionName
    }})
    dispatch({ type: 'setBasic', toast: {
      isShow: true,
      type: 'success',
      msg: 'Collection deleted successfully.'
    }});
    onCancelDelete();
  }

  return (
    <>
      <ModalAddCollection 
        isShowModal={showModalCollection} 
        collection={collectionName}
        onConfirm={() => {
          setShowModalCollection(false)
          dispatch({ type: 'setBasic', toast: {
            isShow: true,
            type: 'success',
            msg: collectionName ? 'Collection updated successfully.' : 'Collection added successfully.'
          }})
        }}
        onCancel={() => {
          setCollectionName("")
          setShowModalCollection(false)
        }}
      />
      <ConfirmationModal 
        confirmModal={confirmModal} 
        onConfirm={onConfirmDelete} 
        onCancel={onCancelDelete} 
      />
      <CRow className="mb-3">
        <CCol className="my-auto">
          <h4 className="mb-0">
            COLLECTIONS
          </h4>
        </CCol>
        <CCol className="text-right">
          <CButton 
            color="primary" 
            size="sm" 
            onClick={() => {
              setCollectionName("")
              setShowModalCollection(true)
            }}
          >
            Add New Collection
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs>
          {collectionsList.length > 0 ? <CRow>
            {collectionsList.map((item, index) => (
              <CCol xs={6} md={4} lg={3} xl={2} key={index}>
                <RowButton>
                  <CCol className="text-right z-index-50">
                    <CButton 
                      onClick={() => {
                        setShowModalCollection(true)
                        setCollectionName(item.name)
                      }} 
                      color="info" 
                      size="sm" 
                      className="m-1 shadow-sm"
                    >
                      <FontAwesomeIcon color="white" icon={faPencil} />
                    </CButton>
                    <CButton 
                      onClick={() => deleteCollection(item.name)} 
                      color="danger" 
                      size="sm" 
                      className="shadow-sm"
                    >
                      <FontAwesomeIcon color="white" icon={faTrash} />
                    </CButton>
                  </CCol>
                </RowButton>
                <Card
                  className="mb-4 mx-auto rounded cursor-pointer"
                  onClick={() => {
                    navigate(`/collection/${item?.name}`)
                  }}
                >
                  <CardImage className="shadow" style={{backgroundImage: `url(${findImage(item)})`}}></CardImage>
                  <CCardBody className="px-0">
                    <div>{item?.name}</div>
                    <div className="mt-1 font-size-11">
                      {`${item?.data?.length} Anime`}
                    </div>
                  </CCardBody>
                </Card>
              </CCol>
            ))}
          </CRow> : <CRow>
            <CCol className="text-center">
              No data to displayed.
            </CCol>
          </CRow>}
        </CCol>
      </CRow>
    </>
  )
}

export default Collection
