import React from "react";

const getCollectionData = (animeId, collectionsList) => {
  return collectionsList.filter(item => {
    const media = item.data.find(media => media.id === animeId)
    if (media) return true
    else return false
  }).map(item => item.name)
}

export {
  getCollectionData
}
