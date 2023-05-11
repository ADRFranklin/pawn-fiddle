import pino from 'pino';

// @ts-ignore
const l = pino({
  level: process.env.LOG_LEVEL || 'info',
  name: process.env.APP_ID,
  prettyPrint: {
    forceColor: true,
    timeTransOnly: true,
  }
});

export default l;
