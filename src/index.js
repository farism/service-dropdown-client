import fetch from 'isomorphic-fetch'
import {
  Environment,
  Network,
  RecordSource,
  Store,
  commitMutation,
  commitLocalUpdate,
} from 'relay-runtime'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'

const KEY = 'authToken'
let token = localStorage.getItem(KEY)

const fetchQuery = (operation, variables, cacheConfig, uploadables) => {
  return fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      // Add authentication and other headers here
      // 'Authorization': document.querySelector('meta[name="jwt-token"]').getAttribute('content'),
      Authorization: token ? `JWT ${token}` : null,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

const network = Network.create(fetchQuery)

const store = new Store(new RecordSource())

const environment = new Environment({
  network,
  store,
})

const load = () =>
  render(
    <AppContainer>
      <App environment={environment} />
    </AppContainer>,
    document.getElementById('root')
  )

// if (module.hot) {
//   module.hot.accept('./App', load)
// }

load()
