module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('posts', {
        img: {
            type: Sequelize.TEXT,
            notEmpty: true
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        }
    });

    return Post;
}