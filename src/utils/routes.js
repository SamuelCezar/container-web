import Home from "../pages/home/Home.vue";
import ListarContainer from "../pages/container/ListarContainer.vue";
import ListarMovimentacao from "../pages/movimentacao/ListarMovimentacao.vue"
import Relatorio from "../pages/relatorio/Relatorio.vue"

export default [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/container/listar",
		component: ListarContainer,
	},
	{
		path: "/movimentacao/listar",
		component: ListarMovimentacao,
	},
	{
		path: "/relatorios",
		component: Relatorio,
	},
];
