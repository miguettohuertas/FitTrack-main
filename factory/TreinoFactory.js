const { log } = require("console");
const { CategoriaModel } = require("../model/CategoriaModel");
const { ExercicioModel } = require("../model/ExercicioModel");
const { TreinoModel } = require("../model/TreinoModel");
const { FuncoesUtil } = require("../util/FuncoesUtil");

class TreinoFactory {
  /**
   * 
   * @param {Array<Object>} rows Resultado da query SQL (join treino, exercicio, categoria)
   * @returns {Array<TreinoModel>}
   */
  static buildFromRows(rows) {
    const treinosMap = new Map();

    for (const row of rows) {
      const treinoId = row.cod_tre;
      const exercicioId = row.cod_exe;
      const categoriaId = row.cod_cat;

      let treino = treinosMap.get(treinoId);
      if (!treino) {
        treino = new TreinoModel(
          treinoId,
          row.descricao_tre,
          row.titulo_tre,
          row.capa_tre,
          null,
          []
        );
        treinosMap.set(treinoId, treino);
      }

      let exercicio = treino.exercicios.find(ex => ex.codigo === exercicioId);

      if (!exercicio) {
        exercicio = new ExercicioModel(
          exercicioId,
          row.titulo_exe,
          row.descricao_exe || "",  // Caso adicione esse campo depois
          FuncoesUtil.converterMinutosParaTempo(row.duracao_exe),
          row.video_exe || "",
          []
        );
        treino.exercicios.push(exercicio);
      }

      if (categoriaId && !exercicio.categorias.some(cat => cat.codigo === categoriaId)) {
        exercicio.categorias.push(new CategoriaModel({
          codigo: categoriaId,
          titulo: row.titulo_cat
        }));
      }
    }

    return Array.from(treinosMap.values());
  }
}

module.exports = { TreinoFactory };