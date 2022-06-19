import React, {useState, useEffect} from 'react'

import {
  CCardBody,
  CButton,
  CCol,
  CRow,
} from "@coreui/react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { RowButton, CardImage, Card } from './Style'
import { ConfirmationModal } from 'src/components'
import ModalCollection from './ModalCollection'

const CollectionDetails = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const dispatch = useDispatch();
  const [showModalCollection, setShowModalCollection] = useState(false)
  const [animeId, setAnimeId] = useState("")
  const [selectedCollection, setSelectedCollection] = useState({})
  const [confirmModal, setConfirmModal] = useState({
    isShow: false,
    title: 'Confirmation Delete',
    msg: 'Are you sure to delete this anime?'
  });
  const collectionsList = useSelector((state) => state.collections.collections)

  useEffect(() => {
    findSelectedCollection()
  }, [collectionsList])

  useEffect(() => {
    findSelectedCollection()
  }, [])

  const findSelectedCollection = () => {
    const selected = collectionsList.find(item => item.name === selectedCollection?.name ? selectedCollection?.name : name)
    setSelectedCollection({...selected})
  }

  const deleteAnime = (id) => {
    setAnimeId(id)
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
    dispatch({ type: 'deleteAnime', payload: {
      name: selectedCollection?.name,
      animeId: animeId,
    }})
    dispatch({ type: 'setBasic', toast: {
      isShow: true,
      type: 'success',
      msg: 'Anime deleted successfully.'
    }});
    onCancelDelete();
  }

  return (
    <>
      <ModalCollection 
        isShowModal={showModalCollection} 
        collection={selectedCollection?.name}
        onConfirm={(name = "") => {
          setShowModalCollection(false)
          dispatch({ type: 'setBasic', toast: {
            isShow: true,
            type: 'success',
            msg: 'Collection updated successfully.'
          }})
          navigate(`/collection/${name}`)
          setSelectedCollection(current => ({
            ...current, name: name
          }))
        }}
        onCancel={() => {
          setShowModalCollection(false)
        }}
      />
      <ConfirmationModal 
        confirmModal={confirmModal} 
        onConfirm={onConfirmDelete} 
        onCancel={onCancelDelete} 
      />
      <CRow className="mb-3 justify-content-between">
        <CCol className="my-auto">
          <h4>
            {selectedCollection?.name}
          </h4>
        </CCol>
        <CCol className="my-auto text-right">
          <CButton 
            color="primary" 
            size="sm" 
            onClick={() => {
              setShowModalCollection(true)
            }}
          >
            Edit Collection
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs>
          {selectedCollection?.data?.length > 0 ? <CRow>
            {selectedCollection.data.map((item, index) => (
              <CCol xs={6} md={4} lg={3} xl={2} key={index}>
                <RowButton>
                  <CCol className="text-right z-index-50">
                    <CButton 
                      onClick={() => deleteAnime(item.id)} 
                      color="danger" 
                      size="sm" 
                      className="shadow-sm"
                    >
                      <FontAwesomeIcon color="white" icon={faTrash} />
                    </CButton>
                  </CCol>
                </RowButton>
                <Card
                  className="mb-4 mx-auto rounded"
                  onClick={() => {
                    navigate(`/anime/${item?.id}`)
                  }}
                >
                  <CardImage className="shadow" style={{backgroundImage: `url(${item.coverImage.large})`}}></CardImage>
                  <CCardBody className="px-0">
                    <div>{item?.title}</div>
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

export default CollectionDetails
