/* eslint-disable*/
const StatusProjetoEnum = Object.freeze({
  PROPOSTA_SUBMETIDA: { codigo: 'SB', descricao: 'Proposta Submetida' },
  PROPOSTA_EM_ANALISE: { codigo: 'AN', descricao: 'Proposta em Análise' },
  PROPOSTA_ACEITA: { codigo: 'AC', descricao: 'Proposta Aceita' },
  PROPOSTA_RECUSADA: { codigo: 'RC', descricao: 'Proposta Recusada' },
  PROPOSTA_EM_REALOCACAO: { codigo: 'RL', descricao: 'Proposta em Realocação' },
  PROJETO_EM_INICIACAO: { codigo: 'IC', descricao: 'Proposta em Iniciação' },
  PROJETO_EM_EXECUCAO: { codigo: 'EX', descricao: 'Projeto em Execução' },
  PROJETO_ENCERRADO: { codigo: 'EC', descricao: 'Projeto Encerrado' },
});
module.exports = function getDescricao(codigo) {
  let descricao = null;
  Object.keys(StatusProjetoEnum).forEach((enumName) => {
    if (StatusProjetoEnum[enumName].codigo === codigo) { descricao = StatusProjetoEnum[enumName].descricao; }
  });
  return descricao;
}
