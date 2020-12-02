import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import * as Styles from './styles';
import 'graphiql/graphiql.css';
//  import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client';
//  import { fragmentTypeDroid } from '../../graphql/fragments/fragments';


const GraphiQLExample = () => {
	return (
		<Styles.GraphiQLExample>
			<GraphiQL
				fetcher={async (graphQLParams) => {
					const data = await fetch('https://rickandmortyapi.com/graphql', {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(graphQLParams),
					});
					return data.json().catch(() => data.text());
				}}
			/>
		</Styles.GraphiQLExample>
	);
};

export default GraphiQLExample;

// http://localhost:4000/graphql
// https://rickandmortyapi.com/graphql
// https://api.github.com/graphql
