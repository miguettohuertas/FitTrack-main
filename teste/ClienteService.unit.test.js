const { ClienteService } = require('../service/ClienteService');
const { ClienteDao } = require('../dao/ClienteDao');
const { ClienteModel } = require('../model/ClienteModel');
const { FuncoesUtil } = require('../util/FuncoesUtil');

jest.mock('../dao/ClienteDao');
jest.mock('../model/ClienteModel');
jest.mock('../util/FuncoesUtil');

describe('ClienteService - Testes Unitários', () => {
  let service;
  let dao;

  beforeEach(() => {
    dao = new ClienteDao();
    service = new ClienteService();
    jest.clearAllMocks();
  });

  describe('autenticar', () => {
    it('deve retornar cliente quando credenciais corretas', async () => {
      const fakeEmail = 'teste@teste.com';
      const fakeSenha = '123456';

      dao.buscarPorEmail.mockResolvedValue([{ id: 1 }]);
      ClienteModel.fromDatabase.mockResolvedValue([{ senha: fakeSenha }]);
      service.dadosCorrespondem = jest.fn().mockReturnValue(true);
      service.validaDadosLogin = jest.fn();

      const result = await service.autenticar(fakeEmail, fakeSenha);

      expect(service.validaDadosLogin).toHaveBeenCalledWith(fakeEmail, fakeSenha);
      expect(dao.buscarPorEmail).toHaveBeenCalledWith(fakeEmail);
      expect(result).toEqual({ senha: fakeSenha });
    });

    it('deve retornar false se cliente não encontrado', async () => {
      dao.buscarPorEmail.mockResolvedValue([]);
      service.validaDadosLogin = jest.fn();

      const result = await service.autenticar('email', 'senha');

      expect(result).toBe(false);
    });

    it('deve retornar false se senha não corresponde', async () => {
      dao.buscarPorEmail.mockResolvedValue([{ id: 1 }]);
      ClienteModel.fromDatabase.mockResolvedValue([{ senha: 'diferente' }]);
      service.dadosCorrespondem = jest.fn().mockReturnValue(false);
      service.validaDadosLogin = jest.fn();

      const result = await service.autenticar('email', 'senha');

      expect(result).toBe(false);
    });
  });

  describe('novoCliente', () => {
    it('deve criar cliente e retornar objeto com código', async () => {
      const dados = { nome: 'Nome', email: 'email@test.com', senha: '123', idade: 30, sexo: 'M', peso: 70, foto: 'foto.jpg' };
      const fakeCliente = { ...dados, codigo: null };
      dao.inserir.mockResolvedValue(10);
      service.validaDadosCadastrais = jest.fn();

      ClienteModel.mockImplementation(() => fakeCliente);
      FuncoesUtil.removerFoto.mockImplementation(() => {});

      const clienteCriado = await service.novoCliente(dados);

      expect(service.validaDadosCadastrais).toHaveBeenCalled();
      expect(dao.inserir).toHaveBeenCalled();
      expect(clienteCriado.codigo).toBe(10);
    });

    it('deve remover foto e lançar erro se falhar na validação', async () => {
      const dados = { nome: 'Nome', email: 'email@test.com', senha: '123', idade: 30, sexo: 'M', peso: 70, foto: 'foto.jpg' };
      service.validaDadosCadastrais = jest.fn().mockRejectedValue(new Error('Erro de validação'));
      FuncoesUtil.removerFoto.mockImplementation(() => {});

      await expect(service.novoCliente(dados)).rejects.toThrow('Erro de validação');
      expect(FuncoesUtil.removerFoto).toHaveBeenCalledWith('foto.jpg');
    });
  });

  describe('deletarCliente', () => {
    it('deve deletar cliente e remover foto', async () => {
      const codigo = 1;
      const clienteMock = { foto_admin: 'foto.jpg' };

      dao.buscarPorId.mockResolvedValue([{ id: codigo }]);
      ClienteModel.fromDatabase.mockResolvedValue([clienteMock]);
      dao.deletar.mockResolvedValue(true);
      FuncoesUtil.removerFoto.mockImplementation(() => {});

      const result = await service.deletarCliente(codigo);

      expect(dao.deletar).toHaveBeenCalledWith(clienteMock);
      expect(FuncoesUtil.removerFoto).toHaveBeenCalledWith('foto.jpg');
      expect(result).toBe(true);
    });

    it('deve lançar erro se cliente não encontrado', async () => {
      dao.buscarPorId.mockResolvedValue([]);
      ClienteModel.fromDatabase.mockResolvedValue([]);

      await expect(service.deletarCliente(99)).rejects.toThrow('Cliente não encontrado!');
    });

    it('deve retornar false se deleção falhar', async () => {
      const clienteMock = { foto_admin: 'foto.jpg' };

      dao.buscarPorId.mockResolvedValue([{ id: 1 }]);
      ClienteModel.fromDatabase.mockResolvedValue([clienteMock]);
      dao.deletar.mockResolvedValue(false);

      const result = await service.deletarCliente(1);

      expect(result).toBe(false);
      expect(FuncoesUtil.removerFoto).not.toHaveBeenCalled();
    });
  });

  describe('atualizarCliente', () => {
    it('deve atualizar cliente e remover foto antiga', async () => {
      const dados = { nome: 'Nome', email: 'email@test.com', senha: '123', idade: 30, sexo: 'M', peso: 70, foto: 'nova.jpg' };
      const id = 1;
      const clienteAntigo = { foto_admin: 'antiga.jpg' };

      dao.buscarPorId.mockResolvedValue([{ id }]);
      ClienteModel.fromDatabase.mockResolvedValue([clienteAntigo]);
      dao.atualizar.mockResolvedValue(true);
      FuncoesUtil.removerFoto.mockImplementation(() => {});

      service.validarDadosParaAtualizar = jest.fn();

      const result = await service.atualizarCliente(dados, id);

      expect(service.validarDadosParaAtualizar).toHaveBeenCalled();
      expect(dao.atualizar).toHaveBeenCalled();
      expect(FuncoesUtil.removerFoto).toHaveBeenCalledWith('antiga.jpg');
      expect(result).toBe(true);
    });

    it('deve remover foto do cliente novo se atualizar falhar', async () => {
      const dados = { nome: 'Nome', email: 'email@test.com', senha: '123', idade: 30, sexo: 'M', peso: 70, foto: 'nova.jpg' };
      const id = 1;

      dao.buscarPorId.mockResolvedValue([{ id }]);
      ClienteModel.fromDatabase.mockResolvedValue([{ foto_admin: 'antiga.jpg' }]);
      dao.atualizar.mockResolvedValue(false);
      FuncoesUtil.removerFoto.mockImplementation(() => {});

      service.validarDadosParaAtualizar = jest.fn();

      await service.atualizarCliente(dados, id);

      expect(FuncoesUtil.removerFoto).toHaveBeenCalled();
    });
  });

  // Testes de validações (validaDadosCadastrais, validarDadosParaAtualizar, validaDadosLogin, etc.) também entram aqui

  describe('validaDadosCadastrais', () => {
    it('deve lançar erro para email vazio', async () => {
      await expect(service.validaDadosCadastrais({ email: '', senha: '123', nome: 'Nome' })).rejects.toThrow('Email deve estar preenchido!');
    });

    it('deve lançar erro para senha vazia', async () => {
      await expect(service.validaDadosCadastrais({ email: 'a@a.com', senha: '', nome: 'Nome' })).rejects.toThrow('Senha deve estar preenchida!');
    });

    it('deve lançar erro para nome vazio', async () => {
      await expect(service.validaDadosCadastrais({ email: 'a@a.com', senha: '123', nome: '' })).rejects.toThrow('Nome deve estar preenchido!');
    });

    it('deve lançar erro para email já cadastrado', async () => {
      dao.buscarPorEmail.mockResolvedValue(true);
      await expect(service.validaDadosCadastrais({ email: 'a@a.com', senha: '123', nome: 'Nome' })).rejects.toThrow('Email já cadastrado no sistema!');
    });

    it('deve lançar erro para email inválido', async () => {
      FuncoesUtil.emailValido.mockReturnValue(false);
      dao.buscarPorEmail.mockResolvedValue(false);
      await expect(service.validaDadosCadastrais({ email: 'invalid', senha: '123', nome: 'Nome' })).rejects.toThrow('Email inválido!');
    });
  });

  describe('validarDadosParaAtualizar', () => {
    it('deve lançar erro para email vazio', () => {
      expect(() => service.validarDadosParaAtualizar({ email: '', senha: '123', nome: 'Nome' })).toThrow('Email deve estar preenchido!');
    });

    it('deve lançar erro para senha vazia', () => {
      expect(() => service.validarDadosParaAtualizar({ email: 'a@a.com', senha: '', nome: 'Nome' })).toThrow('Senha deve estar preenchida!');
    });

    it('deve lançar erro para nome vazio', () => {
      expect(() => service.validarDadosParaAtualizar({ email: 'a@a.com', senha: '123', nome: '' })).toThrow('Nome deve estar preenchido!');
    });

    it('deve lançar erro para email inválido', () => {
      FuncoesUtil.emailValido.mockReturnValue(false);
      expect(() => service.validarDadosParaAtualizar({ email: 'invalid', senha: '123', nome: 'Nome' })).toThrow('Email inválido!');
    });

    it('deve lançar erro para senha inválida', () => {
      expect(() => service.validarDadosParaAtualizar({ email: 'a@a.com', senha: 'a'.repeat(19), nome: 'Nome' })).toThrow('Senha ultrapassou máximo de caracteres!');
    });
  });

  describe('validaDadosLogin', () => {
    it('deve lançar erro para email vazio', () => {
      expect(() => service.validaDadosLogin('', '123')).toThrow('Email deve estar preenchido!');
    });

    it('deve lançar erro para email inválido', () => {
      FuncoesUtil.emailValido.mockReturnValue(false);
      expect(() => service.validaDadosLogin('invalid', '123')).toThrow('Email inválido!');
    });

    it('deve lançar erro para senha vazia', () => {
      expect(() => service.validaDadosLogin('a@a.com', '')).toThrow('Senha deve estar preenchida!');
    });
  });

  describe('dadosCorrespondem', () => {
    it('retorna false se cliente for null', () => {
      expect(service.dadosCorrespondem(null, 'senha')).toBe(false);
    });

    it('retorna false se senha for diferente', () => {
      const cliente = { senha: '123' };
      expect(service.dadosCorrespondem(cliente, '456')).toBe(false);
    });

    it('retorna true se senha coincide', () => {
      const cliente = { senha: 'senha123' };
      expect(service.dadosCorrespondem(cliente, 'senha123')).toBe(true);
    });
  });
});
