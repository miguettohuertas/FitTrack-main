const { TreinoFactory } = require('../factory/TreinoFactory');
const { TreinoModel } = require('../model/TreinoModel');
const { ExercicioModel } = require('../model/ExercicioModel');
const { CategoriaModel } = require('../model/CategoriaModel');
const { FuncoesUtil } = require('../util/FuncoesUtil');

jest.mock('../util/FuncoesUtil', () => ({
  FuncoesUtil: {
    converterMinutosParaTempo: jest.fn()
  }
}));

describe('TreinoFactory.buildFromRows', () => {
  beforeEach(() => {
    FuncoesUtil.converterMinutosParaTempo.mockImplementation(min => `${min}:00`);
  });

  test('deve construir um treino com um exercício e uma categoria', () => {
    const rows = [
      {
        cod_tre: 1,
        descricao_tre: 'desc treino',
        titulo_tre: 'titulo treino',
        capa_tre: 'capa.png',
        cod_exe: 10,
        titulo_exe: 'Agachamento',
        descricao_exe: 'desc exe',
        duracao_exe: 15,
        video_exe: 'video.mp4',
        cod_cat: 100,
        titulo_cat: 'Pernas'
      }
    ];

    const resultado = TreinoFactory.buildFromRows(rows);

    expect(resultado).toHaveLength(1);
    const treino = resultado[0];
    expect(treino).toBeInstanceOf(TreinoModel);
    expect(treino.codigo).toBe(1);
    expect(treino.exercicios).toHaveLength(1);

    const exercicio = treino.exercicios[0];
    expect(exercicio).toBeInstanceOf(ExercicioModel);
    expect(exercicio.codigo).toBe(10);
    expect(exercicio.duracao).toBe('15:00');
    expect(exercicio.categorias).toHaveLength(1);
    expect(exercicio.categorias[0]).toBeInstanceOf(CategoriaModel);
    expect(exercicio.categorias[0].codigo).toBe(100);
  });

  test('deve adicionar vários exercícios a um mesmo treino', () => {
    const rows = [
      {
        cod_tre: 1,
        descricao_tre: 'desc treino',
        titulo_tre: 'titulo treino',
        capa_tre: 'capa.png',
        cod_exe: 10,
        titulo_exe: 'Agachamento',
        descricao_exe: 'desc',
        duracao_exe: 10,
        video_exe: 'v1.mp4',
        cod_cat: 101,
        titulo_cat: 'Pernas'
      },
      {
        cod_tre: 1,
        descricao_tre: 'desc treino',
        titulo_tre: 'titulo treino',
        capa_tre: 'capa.png',
        cod_exe: 11,
        titulo_exe: 'Flexão',
        descricao_exe: 'desc2',
        duracao_exe: 12,
        video_exe: 'v2.mp4',
        cod_cat: 102,
        titulo_cat: 'Peito'
      }
    ];

    const resultado = TreinoFactory.buildFromRows(rows);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].exercicios).toHaveLength(2);
  });

  test('deve adicionar múltiplas categorias a um mesmo exercício sem duplicar', () => {
    const rows = [
      {
        cod_tre: 1,
        descricao_tre: 'desc',
        titulo_tre: 'titulo',
        capa_tre: '',
        cod_exe: 20,
        titulo_exe: 'Supino',
        descricao_exe: '',
        duracao_exe: 8,
        video_exe: '',
        cod_cat: 201,
        titulo_cat: 'Peito'
      },
      {
        cod_tre: 1,
        descricao_tre: 'desc',
        titulo_tre: 'titulo',
        capa_tre: '',
        cod_exe: 20,
        titulo_exe: 'Supino',
        descricao_exe: '',
        duracao_exe: 8,
        video_exe: '',
        cod_cat: 202,
        titulo_cat: 'Tríceps'
      },
      {
        cod_tre: 1,
        descricao_tre: 'desc',
        titulo_tre: 'titulo',
        capa_tre: '',
        cod_exe: 20,
        titulo_exe: 'Supino',
        descricao_exe: '',
        duracao_exe: 8,
        video_exe: '',
        cod_cat: 201,
        titulo_cat: 'Peito'
      }
    ];

    const resultado = TreinoFactory.buildFromRows(rows);

    expect(resultado).toHaveLength(1);
    const exercicio = resultado[0].exercicios[0];
    expect(exercicio.categorias).toHaveLength(2);
    expect(exercicio.categorias.map(c => c.codigo)).toEqual(expect.arrayContaining([201, 202]));
  });

  test('deve retornar lista vazia se nenhuma linha for fornecida', () => {
    const resultado = TreinoFactory.buildFromRows([]);
    expect(resultado).toEqual([]);
  });
});
