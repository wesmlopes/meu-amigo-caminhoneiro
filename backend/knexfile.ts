import path from 'path'
    module.exports = {
        client: 'mysql2',
        connection: {
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'amigocaminhoneiro'
        },
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds')
        },
        useNullAsDefault: true
    }; 