/* eslint-disable @typescript-eslint/no-var-requires */
const { checkAuth } = require('./check-auth');

const authMiddleware = () => ({
  // eslint-disable-next-line consistent-return
  before: async (handler) => {
    try {
      const user = await checkAuth(handler.event);
      // eslint-disable-next-line no-param-reassign
      handler.event.user = user;
    } catch (error) {
      return handler.callback(null, {
        statusCode: 401,
        body: JSON.stringify({
          error: error.message,
        }),
      });
    }
  },
});

module.exports = {
  authMiddleware,
};
