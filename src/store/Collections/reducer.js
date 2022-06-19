const initialState = {
  collections: []
}
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addCollection':
      return { 
        ...state, 
        collections: [
          ...state.collections, action.payload
        ]
      }
    case 'addMediaToCollection':
      const data = {...action.payload};
      return {
        ...state,
        collections: state.collections.map(collection => {
          if (collection.name !== data.name) return collection
          else {
            collection.data.push(data.data)
            return collection
          }
        })
      }
    case 'updateCollection':
      return {
        ...state,
        collections: state.collections.map(collection => {
          if (collection.name !== action.payload.name) return collection
          else {
            // collection.name = action.payload.newName
            // return collection
            return {
              ...collection, 
              name: action.payload.newName
            }
          }
        })
      }
    case 'deleteCollection':
      return {
        ...state,
        collections: state.collections.filter(collection => collection.name !== action.payload.name)
      }
    case 'deleteAnime':
      return {
        ...state,
        collections: state.collections.map(collection => {
          if (collection.name !== action.payload.name) return collection
          else {
            const animeList = collection.data.filter(item => item.id !== action.payload.animeId)
            collection.data = [...animeList]
            return collection
          }
        })
      }
    default:
      return state
  }
}

export default reducer
