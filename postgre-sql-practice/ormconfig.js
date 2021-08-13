module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DBNAME,
  entities: ['dist/**/*.entity.js'],
  synchronize: true, //! 개발모드에서만 true로 사용하자
};
