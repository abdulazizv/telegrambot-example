module.exports = {
    client:'mysql',
    connection: {
        database:'db_bot',
        user:'root',
        password:'checkhack__01',
        charset: 'utf8mb4'
    },
    pool:{
        min:2,
        max:10,
    },
}