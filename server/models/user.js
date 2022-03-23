module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        user_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        qualification: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        city: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        phone_number: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        role: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return User;
}