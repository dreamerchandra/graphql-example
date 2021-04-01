import App from "./App";
import React, { Suspense } from 'react';
import './App.css';
import RelayEnvironment from './RelayEnvironment';
import AppBackEndQuery from './__generated__/apiBackEndQuery.graphql';
import AppFrontEndQuery from './__generated__/apiFrontEndQuery.graphql';
import { useQueryLoader, loadQuery } from 'react-relay/hooks';
import { FrontEndNameQuery, BackEndNameQuery } from './api'


const backEndPrefetcher = loadQuery(RelayEnvironment, BackEndNameQuery);
const frontEndPreFetcher = loadQuery(RelayEnvironment, FrontEndNameQuery);

const GraphqlProvider = () => {
    const [frontEndRef, loadQueryFrontEnd] = useQueryLoader(
        AppFrontEndQuery,
        frontEndPreFetcher
    );
    const refreshFrontEnd = React.useCallback((variables) => {
        loadQueryFrontEnd(variables, { fetchPolicy: 'network-only' });
    }, [loadQueryFrontEnd]);

    const [backEndRef, loadQueryBackEnd] = useQueryLoader(
        AppBackEndQuery,
        backEndPrefetcher
    );
    const refreshBackEnd = React.useCallback((variables) => {
        loadQueryBackEnd(variables, { fetchPolicy: 'network-only' });
    }, [loadQueryBackEnd]);

    return (
        <Suspense fallback={'Loading...'}>
            <App
                frontEnd={{
                    ref: frontEndRef,
                    fetch: refreshFrontEnd
                }}
                backEnd={{
                    ref: backEndRef,
                    fetch: refreshBackEnd
                }} />
        </Suspense>
    );
}

export default GraphqlProvider

