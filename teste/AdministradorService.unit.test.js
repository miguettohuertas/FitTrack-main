const { AdministradorService } = require('../service/AdministradorService');
const { FuncoesUtil } = require('../util/FuncoesUtil');

jest.mock('../dao/AdministradorDao');
jest.mock('../util/FuncoesUtil');

describe('AdministradorService - Unitários', () => {
  let service;

  beforeEach(() => {
    service = new AdministradorService();
  });

  test('validaDadosLogin - email vazio', () => {
    expect(() => service.validaDadosLogin('', '123')).toThrow('Email deve estar preenchido!');
  });

  test('validaDadosLogin - senha vazia', () => {
    expect(() => service.validaDadosLogin('email@teste.com', '')).toThrow('Senha deve estar preenchida!');
  });

  test('validarDados - email inválido', () => {
    FuncoesUtil.emailValido.mockReturnValue(false);
    expect(() => service.validarDados('email_invalido', '123456')).toThrow('Email inválido');
  });

  test('validarDados - senha muito longa', () => {
    FuncoesUtil.emailValido.mockReturnValue(true);
    const senhaLonga = '1'.repeat(19);
    expect(() => service.validarDados('email@teste.com', senhaLonga)).toThrow('Senha possui mais que 18 caracteres');
  });

  test('dadosCorrespondem - dados corretos', () => {
    const admin = { senha: '1234' };
    expect(service.dadosCorrespondem(admin, '1234')).toBe(true);
  });

  test('dadosCorrespondem - senha incorreta', () => {
    const admin = { senha: '1234' };
    expect(service.dadosCorrespondem(admin, 'errada')).toBe(false);
  });

  test('emailVazio - deve retornar true para valores inválidos', () => {
    expect(service.emailVazio(null)).toBe(true);
    expect(service.emailVazio('')).toBe(true);
  });

  test('senhaVazia - deve retornar true para valores inválidos', () => {
    expect(service.senhaVazia(undefined)).toBe(true);
    expect(service.senhaVazia('')).toBe(true);
  });
});
