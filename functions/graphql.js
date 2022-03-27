import dotenv from 'dotenv';
import middy from 'middy';
import fetch from 'node-fetch';
import { authMiddleware } from '../functions-helpers/auth-middleware';

dotenv.config();

const graphqlHandler = async (event, context, callback) => {
  const url = 'https://graphql.us.fauna.com/graphql';
  const accessToken = `Basic ${process.env.FAUNA_ACCESS_TOKEN}`;
  const { query } = JSON.parse(event.body);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      result,
    }),
  });
};

const handler = middy(graphqlHandler).use(authMiddleware());

export { handler };
