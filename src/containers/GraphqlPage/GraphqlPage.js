import React from 'react';
import { Helmet } from 'react-helmet-async';

import GraphiQLExample from '../../components/GraphiQLExample/GraphiQLExample';
import { LinkTest } from '../../components/jestTest/LinkTest';

import './fooo.css';
import splashImage from './splashImage-2048x719.jpg';

const GraphqlPage = () => {
	return (
		<>
			<Helmet title="GraphiQL Page" />

			<div className="container">
				<h1 className="mt-4 mb-3">GraphiQL Page And More!</h1>

        <div className="mb-5">
          GraphiQL Page Works?????
        </div>

				<div className="mb-5">
					<LinkTest page="https:\/\/github.com">Github</LinkTest>
				</div>

				<div className="mb-5">
					<GraphiQLExample />
				</div>
			</div>
		</>
	);
};

export default GraphqlPage;
