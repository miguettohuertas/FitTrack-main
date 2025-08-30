jest.mock('mysql2/promise');

const { conectarBD } = require('../database');
const mysql = require('mysql2/promise');

describe('CT-020', () => {
    describe('conectarBD', () => {
        test('deve retornar a conexão simulada', async () => {
            const conexaoMock = { query: jest.fn() };            
            mysql.createConnection.mockResolvedValue(conexaoMock);

            const conexao = await conectarBD();

            expect(mysql.createConnection).toHaveBeenCalledWith({
                host: 'localhost',
                port: 3306,
                user: 'root',
                password: 'root',
                database: 'fittrack'
            });

            expect(conexao).toBe(conexaoMock);
        });
    });
});