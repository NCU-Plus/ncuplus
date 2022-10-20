export const config = {
  db: {
    type: process.env.DB_TYPE || 'mariadb',
    // https://typeorm.io/#/connection-options/common-connection-options
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'username',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dbname',
    charset: 'utf8mb4',
    timezone: process.env.DB_TIMEZONE || 'local',
    extra: {
      connectionLimit: 10,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
  },
  oauth: {
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    redirectUrl: process.env.OAUTH_REDIRECT_URL,
  },
};
