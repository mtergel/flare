import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange,
} from "urql";
import { authExchange } from "@urql/exchange-auth";
import cookie from "js-cookie";
import { makeOperation } from "@urql/core";
import { auth } from "./initApp";

const isServerSide = typeof window === "undefined";

const getAuth = async ({ authState }: any) => {
  if (!authState) {
    const token = cookie.get("token");
    if (token) {
      return { token };
    } else {
      const user = auth.currentUser;
      if (user) {
        // refetch token
        const token = await user.getIdToken(true);
        cookie.set("token", token, {
          expires: 0.24,
          path: "/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });
        return {
          token,
        };
      }
    }
    return null;
  }

  const user = auth.currentUser;
  if (user) {
    // refetch token
    const token = await user.getIdToken(true);
    cookie.set("token", token, {
      expires: 0.24,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    return {
      token,
    };
  }

  //   no user
  cookie.remove("token");

  return null;
};

const addAuthToOperation = ({ authState, operation }: any) => {
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === "function"
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authState.token}`,
      },
    },
  });
};

// If didAuthError returns true,
// it will trigger the exchange to trigger the logic for
// asking for re-authentication via getAuth.
const didAuthError = ({ error }: any) => {
  return error.graphQLErrors.some(
    (e: any) =>
      e.extensions?.code === "invalid-jwt" ||
      e.extensions?.code === "invalid-headers"
  );
};

const willAuthError = ({ authState }: any) => {
  if (!authState) return true;
  return false;
};

// The `ssrExchange` must be initialized with `isClient` and `initialState`
const ssr = ssrExchange({
  isClient: !isServerSide,
  // @ts-ignore
  initialState: !isServerSide ? window.__URQL_DATA__ : undefined,
});

const client = createClient({
  url: "https://flare.hasura.app/v1/graphql",
  exchanges: [
    dedupExchange,
    cacheExchange,
    ssr,
    authExchange({
      getAuth,
      addAuthToOperation,
      willAuthError,
      didAuthError,
    }),
    fetchExchange,
  ],
});

export default client;
