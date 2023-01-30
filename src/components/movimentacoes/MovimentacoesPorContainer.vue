<template>
	<div id="app" style="background:#d3dbe2">
		<cabecalho titulo = "Movimentações por Container" descricao = "Listagem de todas as Movimentações deste Container"/>
		<div  style="margin-top: -4%" class="container bg-white shadow p-5 mb-5 bg-white rounded mt-n5">
			<div>
				<h4>{{"CONTAINER: " + this.container.numeroContainer}}</h4>
				<b-table
					id="tableMovimentacoesPorContainer"
					striped
					hover
					v-bind:items="container.movimentacao"
					v-bind:fields="tableMovimentacaoFields"
					show-empty
					responsive
				>
					<template v-slot:table-busy>
						<div class="text-center text-danger my-2">
							<b-spinner class="align-middle"/>
							<strong>Carregando...</strong>
						</div>
					</template>

					<template v-slot:empty>
						<p style="text-align: center;">{{tableMovimentacao_emptyMessage}}</p>
					</template>

					<template v-slot:cell(index)="data">{{data.index + 1}}</template>

					<template v-slot:cell(tipoMovimentacao)="data"><p class="text-capitalize">{{data.item.tipoMovimentacao}}</p></template>

					<template v-slot:cell(inicio)="data">{{data.item.dataHoraInicio}}</template>

					<template v-slot:cell(fim)="data">{{data.item.dataHoraFim}}</template>

					<template v-slot:cell(movimentacoes)="data">
						<b-button
							v-on:click="abrirModalMovimentacoes(data.item.id)"
							variant="primary"
						>
						Visualizar
						</b-button>
					</template>
				</b-table>

				<b-pagination
					align="center"
				/>

			</div>
		</div>
	</div>
</template>

<script>

export default {
	components: {
	},
	props: {
		containerParaListarMovimentacoes: {
			type: Object,
		},
	},
	data() {
		return {
			container: [],
			movimentacao: null,

			tableMovimentacaoFields: [
				{
					key: "index",
					label: "#",
				},
				{
					key: "tipoMovimentacao",
					label: "Tipo",
				},
				{
					key: "inicio",
					label: "Data/Hora Início",
				},
				{
					key: "fim",
					label: "Data/Hora Fim",
				},
			],
			tableMovimentacao_emptyMessage: "Nenhuma Movimentação Encontrada Para Esse Container ",

		};
	},

	created() {
		this.container = this.containerParaListarMovimentacoes;
	},
	methods: {
	},
};
</script>

<style>
.btn.mt-5 {
  margin-top: 32px !important;
}
</style>
