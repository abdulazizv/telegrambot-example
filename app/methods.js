const Session = require('telegraf-mysql-session');

const mysqlSession = new Session({
    host:"localhost",
    user:"root",
    password:"checkhack__01",
    database:"db_bot"
});

const saveSession = (ctx) => {
    mysqlSession.saveSession(
        mysqlSession.options.getSessionKey(ctx),
        ctx.session
    )
}

const getSession = (id) => {
    return mysqlSession.getSession(id + ":" + id);
};

module.exports = {
    mysqlSession,
    saveSession,
    getSession
};
