import { getHandlerPath } from '../../configHelpers';

export default {
  handler: getHandlerPath(__dirname),
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/deleteLastStack',
      },
    },
  ],
};
