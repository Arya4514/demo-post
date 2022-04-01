module.exports = {
    APP_NAME: 'Petrolpump',
    PORT: 8080,
    DB: {
        username: 'postgres',
        password: 'root',
        database: 'demo-staging',
        host: '206.81.14.178',
        dialect: 'postgres'
    },
    EMAIL_CONFIG: {
        host: "smtp.ethereal.email",
        port: 587,
        secure: true,
        email: "loyce.kub2@ethereal.email",
        username: "loyce.kub2@ethereal.email",
        password: "5M61abQbJVpZctgBY2"
    },
    jwt_issuer: "AryanStaging",
    jwt_secret: "awd8awdadd87a8fef"
};
