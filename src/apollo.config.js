import {
  DefaultApolloClient,
  provideApolloClient,
  ApolloClients,
} from '@vue/apollo-composable'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client/core'

import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  const token = localStorage.getItem('token')
  if (token !== null) {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  }
})

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(`[GraphQL error]: ${message}`, {
          locations,
          operationName: operation?.operationName,
          path,
        })
      })
      return forward(operation)
    }

    if (networkError) {
      const errorCode = networkError.response?.status
      if (errorCode === 401) {
        console.error(networkError)
        console.error('Clear token')
        localStorage.clear()
        return forward(operation)
      } else {
        console.error('network error when fetching', networkError)
      }
    }
  }
)

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_HASURA_URL,
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
  },
})
