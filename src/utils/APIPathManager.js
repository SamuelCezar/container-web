const pathManager = {

	salvarContainer() {
		return "http://localhost:8080/container"
	},
	listarContainers() {
		return "http://localhost:8080/container"
	},
	editarContainer() {
		return "http://localhost:8080/container/"
	},
	deletarContainer(idContainer) {
		return "http://localhost:8080/container/" + idContainer
	},

	// -------------------------------------------------------

	salvarMovimentacao() {
		return "http://localhost:8080/movimentacao"
	},
	consultarMovimentacoes() {
		return "http://localhost:8080/movimentacao"
	},
	editarMovimentacao() {
		return "http://localhost:8080/movimentacao"
	},
	deletarMovimentacao(idMovimentacao) {
		return "http://localhost:8080/movimentacao/" + idMovimentacao
	},

	//---------------------------------------------------
	consultarClientes() {
		return "http://localhost:8080/relatorio/consultarClientes"
	},
	buscarMovimentacaoPorClienteEtipo(cliente, tipo) {
		return "http://localhost:8080/relatorio/gerarRelatorio"
		+ "?cliente="
		+ cliente
		+ "&tipo="
		+tipo
	}
};

export default pathManager;
