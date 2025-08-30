const fs = require('fs');
const path = require('path');
const { FuncoesUtil } = require('../util/FuncoesUtil');

jest.mock('fs');

describe('FuncoesUtil', () => {
  describe('emailValido', () => {
    test('deve retornar true para email válido', () => {
      expect(FuncoesUtil.emailValido('teste@exemplo.com')).toBe(true);
    });

    test('deve retornar false para email inválido', () => {
      expect(FuncoesUtil.emailValido('invalido@')).toBe(false);
      expect(FuncoesUtil.emailValido('invalido@com')).toBe(false);
      expect(FuncoesUtil.emailValido('')).toBe(false);
    });
  });

  describe('converterMinutosParaTempo', () => {
    test('deve converter corretamente minutos para HH:mm:ss', () => {
      expect(FuncoesUtil.converterMinutosParaTempo(0)).toBe('00:00:00');
      expect(FuncoesUtil.converterMinutosParaTempo(1.5)).toBe('00:01:30');
      expect(FuncoesUtil.converterMinutosParaTempo(60)).toBe('01:00:00');
      expect(FuncoesUtil.converterMinutosParaTempo(90.5)).toBe('01:30:30');
    });
  });

  describe('existeArquivo', () => {
    test('deve retornar true se o arquivo existir', () => {
      fs.existsSync.mockReturnValue(true);
      expect(FuncoesUtil.existeArquivo('/caminho/falso.txt')).toBe(true);
    });

    test('deve retornar false se o arquivo não existir', () => {
      fs.existsSync.mockReturnValue(false);
      expect(FuncoesUtil.existeArquivo('/caminho/nao_existe.txt')).toBe(false);
    });
  });

  describe('fotoValidaParaRemover', () => {
    test('deve retornar true para caminho de imagem válido', () => {
      expect(FuncoesUtil.fotoValidaParaRemover('/images/uploads/foto.png')).toBe(true);
    });

    test('deve retornar false para avatar padrão', () => {
      expect(FuncoesUtil.fotoValidaParaRemover('/images/assets/avatar.png')).toBe(false);
      expect(FuncoesUtil.fotoValidaParaRemover('')).toBe(false);
    });
  });

  describe('removerFoto', () => {
    beforeEach(() => {
      jest.spyOn(FuncoesUtil, 'removeImagem').mockImplementation(() => {});
    });

    test('deve chamar removeImagem se a foto for válida', () => {
      FuncoesUtil.removerFoto('/images/uploads/foto.png');
      expect(FuncoesUtil.removeImagem).toHaveBeenCalledWith('/images/uploads/foto.png');
    });

    test('não deve chamar removeImagem se a foto for inválida', () => {
      FuncoesUtil.removerFoto('/images/assets/avatar.png');
      expect(FuncoesUtil.removeImagem).not.toHaveBeenCalled();
    });
  });

  describe('removeImagem', () => {
    test('deve tentar remover o arquivo com fs.unlink', () => {
      const unlinkMock = jest.fn((_, cb) => cb(null));
      fs.unlink = unlinkMock;

      const caminho = '/images/uploads/minha_foto.jpg';
      const splitCaminho = caminho.split('/');
      const caminhoEsperado = path.join(__dirname, '../../src/public', splitCaminho[1], splitCaminho[2], splitCaminho[3]);

      FuncoesUtil.removeImagem(caminho);
      expect(unlinkMock).toHaveBeenCalledWith(caminhoEsperado, expect.any(Function));
    });
  });
});
