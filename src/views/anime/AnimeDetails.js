import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CAccordion,
  CAccordionItem,
  CAccordionBody,
  CCol,
  CRow,
} from "@coreui/react";
import { Tag } from 'src/components'
import { useLazyQuery } from "@apollo/client";
import { GET_ANIME_DETAILS } from "src/graphql/Anime";
import { getCollectionData } from 'src/helpers/Utils';
import { ImageBaner, AccordionHeader, ButtonGenre, ReviewerAvatar, Card, CardImageEpisode } from "./Style";
import { useSelector, useDispatch } from 'react-redux'
import ModalAddAnime from "./ModalAddAnime";

const AnimeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const collectionsList = useSelector((state) => state.collections.collections)
  const [getAnimeDetails, { data, error, loading }] = useLazyQuery(
    GET_ANIME_DETAILS,
    {
      variables: {
        id: id,
      },
    }
  );
  const [anime, setAnime] = useState({});
  const [showModalAddAnime, setShowModalAddAnime] = useState(false);

  useEffect(() => {
    dispatch({ type: 'setBasic', isShowSpinner: loading });
  }, [loading])

  useEffect(() => {
    if (error) {
      dispatch({ type: 'setBasic', toast: {
        isShow: true,
        type: 'danger',
        msg: 'Internal service error.'
      }});
    }
  }, [error])

  useEffect(() => {
    if (data) {
      const { Media } = data;
      setAnime({ ...Media });
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      getAnimeDetails();
    }
  }, []);

  const genreList = (genres) => {
    return (
      genres ? <Tag tagList={genres} isDisable={true} color="primary" /> : ""
    )
  }

  const collectionList = () => {
    const collectionOfAnime = getCollectionData(anime.id, collectionsList);

    return (
      collectionOfAnime && collectionOfAnime.length > 0 ? <Tag tagList={collectionOfAnime} isDisable={false} isCollection={true} color="secondary" /> : '-'
    )
  }

  const setVisible = () => {
    setShowModalAddAnime(false);
  }

  const checkAnimeAlreadyAdded = (collectionName) => {
    const mediaCollection = collectionsList.filter(item => {
      if (item.name === collectionName) {
        const media = item.data.find(media => media.id === anime.id)
        if (media) return true;
        else return false;
      } else {
        return false
      }
    });

    return mediaCollection.length > 0
  }

  const addAnimeToCollection = (name) => {
    if (checkAnimeAlreadyAdded(name)) {
      dispatch({ type: 'setBasic', toast: {
        isShow: true,
        type: 'warning',
        msg: 'Anime already added to this collection.'
      }});
    } else {
      if (collectionsList.length > 0) {
        dispatch({ type: 'addMediaToCollection', payload: {
          name: name,
          data: {
            id: anime?.id,
            title: anime?.title?.userPreferred,
            bannerImage: anime?.bannerImage,
            coverImage: anime?.coverImage
          }
        }})
      } else {
        dispatch({ type: 'addCollection', payload: {
          name: name,
          data: [{
            id: anime?.id,
            title: anime?.title?.userPreferred,
            bannerImage: anime?.bannerImage,
            coverImage: anime?.coverImage
          }]
        }})
      }
      dispatch({ type: 'setBasic', toast: {
        isShow: true,
        type: 'success',
        msg: 'Anime added successfully.'
      }});
    }
    setShowModalAddAnime(false);
  }

  const reviewPreview = (reviewPreview) => {
    return (
      reviewPreview ? reviewPreview.map((item, index) => {
        return <CAccordion activeItemKey={0} className="mb-1" key={index}>
          <CAccordionItem itemKey={index}>
            <AccordionHeader>
              <div className="font-size-11">
                {`Rating: ${item.rating}`}
              </div>
            </AccordionHeader>
            <CAccordionBody>
              <div className="font-size-11">
                <CRow>
                  <CCol xs={12} sm={6} lg={3}>
                    <ReviewerAvatar className="shadow" style={{backgroundImage: `url(${item?.user?.avatar?.large})`}}></ReviewerAvatar>
                  </CCol>
                  <CCol xs={12} sm={6} lg={9}>
                    <div className="mt-1">
                      {item?.user?.name}
                    </div>
                    <div className="mt-1">
                      {item.summary}
                    </div>
                  </CCol>
                </CRow>
              </div>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      }) : ""
    )
  }

  const streamingEpisode = (streamingEpisodes) => {
    return (
      streamingEpisodes ? streamingEpisodes.map((item, index) => {
        return <CCol xs={6} md={4} lg={3} xl={2} key={index}>
          <Card
            className="mb-4 mx-auto rounded"
            onClick={() => {
              window.open(
                item.url,
                '_blank'
              );
            }}
          >
            <CardImageEpisode className="shadow" style={{backgroundImage: `url(${item.thumbnail})`}}></CardImageEpisode>
            <CCardBody className="px-0">
              <div>{item.title}</div>
              <div className="font-size-11 mt-2">
                {item.site}
              </div>
            </CCardBody>
          </Card>
        </CCol>
      }) : ""
    )
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <ModalAddAnime visible={showModalAddAnime} setVisible={setVisible} addAnimeToCollection={addAnimeToCollection} id={anime?.id} />
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <CRow className="justify-content-between">
                    <CCol className="my-auto">
                      <strong>{anime?.title?.english}</strong>
                    </CCol>
                    <CCol style={{textAlign: 'right'}} className="my-auto">
                      <CButton color="primary" size="sm" onClick={() => setShowModalAddAnime(true)}>
                        Add to the Collection
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody className="pt-0 px-0">
                  <ImageBaner
                    className="mb-4"
                    style={{ backgroundImage: `url(${anime?.bannerImage})` }}
                  ></ImageBaner>
                  <div className="px-3">
                    <div className="font-size-11">Collection:</div>
                    <div className="d-flex flex-wrap mb-2">
                      {collectionList()}
                    </div>
                    <div className="font-size-11">Genre:</div>
                    <div className="d-flex flex-wrap mb-2">
                      {genreList(anime?.genres)}
                    </div>
                    <div className="mt-1 mb-2">
                      <ul className="font-size-11">
                        <li>{`Score: ${anime?.averageScore || ""}`}</li>
                        <li>{`Episode: ${anime?.episodes || ""}`}</li>
                        <li>{`Format: ${anime?.format || ""}`}</li>
                        <li>{`Popularity: ${anime?.popularity || ""}`}</li>
                        <li>{`Season: ${anime?.season || ""}`}</li>
                        <li>{`Status: ${anime?.status || ""}`}</li>
                      </ul>
                    </div>
                    <div className="mt-1 mb-3">
                      <div className="font-size-11">Review:</div>
                      {reviewPreview(anime?.reviewPreview?.nodes)}
                    </div>
                    <div className="mt-1 mb-3 font-size-11">Description:</div>
                    <p dangerouslySetInnerHTML={{__html: anime?.description }} style={{fontWeight: 'normal', fontSize: '11px' }}></p>
                    <div className="mt-1 mb-3">
                      <div className="font-size-11">Streaming Episode:</div>
                      <CRow>
                        {streamingEpisode(anime?.streamingEpisodes)}
                      </CRow>
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  );
};

export default AnimeDetails;
