import React from 'react'

const Anime = React.lazy(() => import('./views/anime/Anime'))
const AnimeDetails = React.lazy(() => import('./views/anime/AnimeDetails'))
const Collection = React.lazy(() => import('./views/collection/Collection'))
const CollectionDetails = React.lazy(() => import('./views/collection/CollectionDetails'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Anime },
  { path: '/anime/:id', name: 'Anime Details', element: AnimeDetails },
  { path: '/collection', name: 'Collection', element: Collection },
  { path: '/collection/:name', name: 'CollectionDetails', element: CollectionDetails },
]

export default routes
