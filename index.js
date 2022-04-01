var express = require('express');
var db = require('./server/models');
const indexRouter = require('./server/routes')
const User = db.user;
var app = express();
var bcrypt = require("bcryptjs");
const role = require('./server/utils/role');

app.use(express.json({
    limit: '50mb'
}));

app.use(express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));

async function initial() {
    try {
        let user = await User.findOne({ where: { user_name: 'Admin' } });
        if (!user) {
            user = await User.create({
                user_name: "Admin",
                password: bcrypt.hashSync("admin", 8),
                role: role.ADMIN
            });
        }
    } catch (error) {
        console.log('Unable to create admin', error)
    }
}
app.use('/uploads', express.static('uploads'));

app.use('/payment', express.static('public'));

app.use("/api", indexRouter);

db.sequelize.sync({ force: false, alter: false }).then(() => {
    console.log("Drop and re-sync db.");
    initial();
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


const PORT = process.env.PORT || 8079;

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});