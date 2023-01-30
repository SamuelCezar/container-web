<template>
	<div id="app" style="background:#d3dbe2">
		<cabecalho titulo = "Movimentações por Cliente" descricao = "Listagem de todas as Movimentações por Cliente e Tipo de Movimentação"/>
		<div  style="margin-top: -4%" class="container bg-white shadow p-5 mb-5 bg-white rounded mt-n5">
			<div>
				<h3>Ciente: {{this.cliente}}</h3> 
				<h6 style="display: flex;">Tipo de movimentação:
					<p class="text-capitalize" style="margin-left: 5px"> {{this.tipoMovimentacao}}</p>
				</h6>
				<b-table
					id="tableMovimentacoesPorClieteETipo"
					striped
					hover
					v-bind:items="movimentacoesPorClienteETipo"
					v-bind:fields="tableMovimentacaoFields"
					show-empty
					responsive
				>

					<template v-slot:empty>
						<p style="text-align: center;">{{tableMovimentacao_emptyMessage}}</p>
					</template>

					<template v-slot:cell(index)="data">{{data.index + 1}}</template>

					<template v-slot:cell(tipoMovimentacao)="data"><p class="text-capitalize">{{data.item.tipoMovimentacao}}</p></template>

					<template v-slot:cell(inicio)="data">{{data.item.dataHoraInicio}}</template>

					<template v-slot:cell(fim)="data">{{data.item.dataHoraFim}}</template>

					<template v-slot:cell(categoriaContainer)="data">{{data.item.categoriaContainer == "Importacao" ? "Importação" : "Exportação"}}</template>

					<template v-slot:cell(numero)="data">{{data.item.numeroContainer}}</template>

				</b-table>

				<hr>
				<h6>Total de movimentações do tipo <b>Importação</b>: {{calculaTotalTipo("Importacao")}}</h6>
				<h6>Total de movimentações do tipo <b>Exportação</b>: {{calculaTotalTipo("Exportação")}}</h6>

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
		movimentacoesPorClienteETipo: {
			type: Array,
		},
		cliente: {
			type: String,
		},
		tipoMovimentacao: {
			type: String,
		},

	},
	data() {
		return {

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
					key: "dataHoraInicio",
					label: "Data/Hora Início",
				},
				{
					key: "dataHoraFim",
					label: "Data/Hora Fim",
				},
				{
					key: "categoriaContainer",
					label: "Categoria",
				},
				{
					key: "numeroContainer",
					label: "Nº do Container",
				},
				
			],
			tableMovimentacao_emptyMessage: "Nenhuma Movimentação Encontrada",

		};
	},

	created() {
	},
	methods: {
		calculaTotalTipo(tipo) {
			let contador = 0;
			for (const item of this.movimentacoesPorClienteETipo) {
				if(item.categoriaContainer == tipo) {
					contador ++;
				}
			}
			return contador;
		}
	},
};
</script>

<style>
</style>
