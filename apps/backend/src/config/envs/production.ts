export const config = {
  db: {
    synchronize: false,
    logging: false,
    extra: {
      connectionLimit: 30,
    },
    migrations: ['dist/migration/*.js'],
    migrationsRun: true,
  },
};
