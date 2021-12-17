import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

export type CustomAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & FromSchema<S>;
export type CustomAPIGatewayProxyResult<S> = Omit<APIGatewayProxyResult, 'body'> & FromSchema<S>;

export type CustomAPIGatewayProxyHandler<InputSchema, OutputSchema> = Handler<
  CustomAPIGatewayProxyEvent<InputSchema>,
  CustomAPIGatewayProxyResult<OutputSchema>
>;
