import React, {useState, useEffect, Fragment} from 'react'

import {
  CCardBody,
  CCol,
  CRow,
  CInputGroup,
  CInputGroupText,
  CFormInput,
} from '@coreui/react'
import { useNavigate } from "react-router-dom";
import { PaginateItems, Tag } from 'src/components'
import { Pagination } from 'src/helpers/Constants';
import { getCollectionData } from 'src/helpers/Utils';
import { useLazyQuery } from '@apollo/client'
import { GET_ANIME } from 'src/graphql/Anime'
import { CardImage, Card } from './Style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'

const Anime = () => {
  const navigate = useNavigate();
  const [animeList, setAnimeList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [forcePage, setForcePage] = useState(0);
  const [variable, setVariable] = useState({
    page: 1,
    perPage: Pagination.itemsPerPage
  });
  const dispatch = useDispatch();
  const collectionsList = useSelector((state) => state.collections.collections)
  const [getAnime, { data, error, loading }] = useLazyQuery(GET_ANIME, {
    variables: variable,
  });

  useEffect(() => {
    dispatch({ type: 'setBasic', isShowSpinner: loading });
  }, [loading])

  const onInputKeyword = (e) => {
    if (e.target.value) {
      setVariable({
        ...variable, 
        page: 1,
        search: e.target.value
      })
    } else {
      setVariable({
        ...variable, 
        page: 1
      })
    }
    setForcePage(0);
  }

  useEffect(() => {
    if (data) {
      const { top } = data;
      const { pageInfo, media } = top;
      setAnimeList([...media]);
      if (pageCount !== pageInfo.lastPage) {
        setPageCount(pageInfo.lastPage);
      }
    }
  }, [data])

  useEffect(() => {
    getAnime();
  }, [])

  useEffect(() => {
    if (error) {
      dispatch({ type: 'setBasic', toast: {
        isShow: true,
        type: 'danger',
        msg: 'Internal service error.'
      }});
    }
  }, [error])

  const handlePageClick = (event) => {
    setForcePage(event.selected);
    setVariable({
      ...variable,
      page: event.selected + 1
    })
    getAnime();
  }

  const collectionList = (animeId) => {
    const collectionOfAnime = getCollectionData(animeId, collectionsList);
    
    return (
      collectionOfAnime && collectionOfAnime.length > 0 ? <Tag tagList={collectionOfAnime} isDisable={false} isCollection={true} color="secondary" /> : '-'
    )
  }

  const gotoAnimeDetails = (id) => {
    navigate(`/anime/${id}`)
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CRow className="mb-3 justify-content-end">
            <CCol className="my-auto">
              <h4 className="mb-0">
                ANIME / MANGA
              </h4>
            </CCol>
            <CCol xs={12} md={6} lg={4} className="my-auto">
              <CInputGroup>
                <CFormInput
                  onInput={onInputKeyword}
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                />
                <CInputGroupText id="basic-addon1">
                  <FontAwesomeIcon color="black" icon={faSearch} />
                </CInputGroupText>
              </CInputGroup>
            </CCol>
          </CRow>
          {!loading ? <Fragment>
            {animeList.length > 0 ? <CRow>
              {animeList.map(item => (
                <CCol xs={6} md={4} lg={3} xl={2} key={item.id}>
                  <Card
                    className="mb-4 mx-auto rounded"
                  >
                    <CardImage 
                      onClick={() => gotoAnimeDetails(item.id)} 
                      className="shadow cursor-pointer" 
                      style={{backgroundImage: `url(${item.coverImage.large})`}}
                    ></CardImage>
                    <CCardBody className="px-0">
                      <div className="cursor-pointer" onClick={() => gotoAnimeDetails(item.id)}>{item.title.userPreferred}</div>
                      <div className="font-size-11 mt-2">Collection:</div>
                        {collectionList(item.id)}
                      <div className="font-size-11 mt-2">Genre:</div>
                      <div className="d-flex flex-wrap mt-1">
                        <Tag tagList={item.genres} isDisable={true} color="primary" />
                      </div>
                      <div className="font-size-11 mt-2">
                        {`${item.episodes} Episode - ${item.status}`}
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
            {
              pageCount !== 0 && 
              <CRow>
                <CCol>
                  <PaginateItems pageCount={pageCount} handlePageClick={handlePageClick} forcePage={forcePage} />
                </CCol>
              </CRow>
            }
          </Fragment> : <Fragment></Fragment>}
        </CCol>
      </CRow>
    </>
  )
}

export default Anime
