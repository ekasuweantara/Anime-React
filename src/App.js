import React, { Component, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import './scss/style.scss'

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co/',
  cache: new InMemoryCache()
});

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Suspense>
            <Routes>
              <Route path="*" name="Home" element={<DefaultLayout />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default App
