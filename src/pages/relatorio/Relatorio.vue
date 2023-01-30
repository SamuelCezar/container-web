<template>
	<div id="app" style="background:#d3dbe2">
		<cabecalho titulo = "Relatórios" descricao = "Listagem das Movimentações agrupadas por cliente e tipo de
movimentação."/>
		<div  style="margin-top: -4%" class="container bg-white shadow p-5 mb-5 bg-white rounded mt-n5">
			<b-form-row class="col-12 p-0">
				<b-form-group class="col-12 p-0" style="display:flex; justify-content:flex-end;">
					<b-button v-on:click="voltar()" variant="primary">
						<b-icon icon="arrow-left" variant="light" font-scale="1" class="cursor-pointer"/>
						Voltar
					</b-button>
				</b-form-group>
			</b-form-row>
		<div>
		<b-form-row style="display: flex" class="col-12 p-0">
			<b-col cols="3">
				<b-form-group class="p-3" label="Cliente: " >
					<b-form-select v-model="cliente" id="clientes" v-bind:class="'form-control' + (cliente_valido == false ? ' is-invalid' : '')">
						<b-form-select-option
							v-for="(cliente, index) in clientes"
							:key="index"
							v-bind:value="cliente"
							>
							{{ cliente }}
						</b-form-select-option>
					</b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="3">
				<b-form-group class="p-3" style="margin-left: -5px; margin-right: -5px" label="Selecione o Tipo: " >
					<b-form-select v-model="tipoMovimentacao" id="tipoMovimentacao" v-bind:class="'form-control' + (tipo_valido == false ? ' is-invalid' : '')">
						<b-form-select-option
							v-for="(tipo, index) in tiposMovimentacao"
							:key="index"
							v-bind:value="tipo.value"
							>
							{{ tipo.text }}
						</b-form-select-option>
					</b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="2">
				<b-button style="margin-top: 46px;" v-on:click="gerarRelatorio()" variant="primary">
					Gerar Relatório
				</b-button>
			</b-col>
		</b-form-row>
			</div>
		</div>

		<b-modal id="modal-tabela-relatorio" hide-footer centered size="xl">
			<template v-slot:modal-title>Movimentações deste Container</template>
			<tabelaRelatorio
			:movimentacoesPorClienteETipo ="movimentacoesPorClienteETipo"
			:cliente ="cliente"
			:tipoMovimentacao="tipoMovimentacao"/>
		</b-modal>

	</div>
</template>

<script>
import axios from "axios";
import TabelaRelatorio from "../../components/relatorio/TabelaRelatorio.vue"

export default {
	components: {
		tabelaRelatorio: TabelaRelatorio,
	},
	data() {
		return {
			movimentacoes: [],
			movimentacao: null,

			clientes: [],
			cliente: null,

			movimentacoesPorClienteETipo: [],

			tipoMovimentacao: "",

			tiposMovimentacao: [
				{ text: "Embarque", value: "embarque" },
				{ text: "Descarga", value: "descarga" },
				{ text: "Gate In", value: "gate in" },
				{ text: "Gate Out", value: "gate out" },
				{ text: "Reposicionamento", value: "reposicionamento" },
				{ text: "Pesagem", value: "pesagem" },
				{ text: "Scanner", value: "scanner" },
			],

			isBusy: false,
			tableMovimentacao_emptyMessage: "Nenhuma Movimentação Encontrada ",

			loadingDeletarMovimentacao: false,
			tipo_valido: null,
			cliente_valido: null,
		};
	},

	created() {
		this.consultarMovimentacoes();
		this.consultarClientes();
	},
	methods: {
		consultarMovimentacoes() {
			this.isBusy = true;
			axios
				.get(this.$pathManager.consultarMovimentacoes())
				.then((response) => {
					this.movimentacoes = response.data[2];
					this.isBusy = false;
				})
				.catch((exception) => {
					console.log("Erro: " + exception);
					this.cartorios = [];
					this.isBusy = false;
				});
		},
		consultarClientes() {
			this.isBusy = true;
			axios
				.get(this.$pathManager.consultarClientes())
				.then((response) => {
					this.clientes = response.data;
					this.isBusy = false;
				})
				.catch((exception) => {
					console.log("Erro: " + exception);
					this.cartorios = [];
					this.isBusy = false;
				});
		},
		gerarRelatorio() {
			this.movimentacoesPorClienteETipo = [];
			this.buscarMovimentacaoPorClienteEtipo();
			this.$bvModal.show("modal-tabela-relatorio")
		},
		buscarMovimentacaoPorClienteEtipo() {
			this.isBusy = true;
			axios
				.get(this.$pathManager.buscarMovimentacaoPorClienteEtipo(this.cliente, this.tipoMovimentacao))
				.then((response) => {
					this.montaMovimentacoesPorClienteETipo(response.data);
					this.isBusy = false;
				})
				.catch((exception) => {
					console.log("Erro: " + exception);
					this.cartorios = [];
					this.isBusy = false;
				});
		},
		montaMovimentacoesPorClienteETipo(dados) {
			let movimentacao = {};
			for (const d of dados) {
				movimentacao.tipoMovimentacao = d[0];
				movimentacao.dataHoraInicio = d[1];
				movimentacao.dataHoraFim = d[2];
				movimentacao.cliente = d[3];
				movimentacao.categoriaContainer = d[4].charAt(0).toUpperCase() + d[4].slice(1);
				movimentacao.numeroContainer = d[5];
				this.movimentacoesPorClienteETipo.push(movimentacao);
				movimentacao = {};
			}
		},
		mensagem(msg = "", titulo = "Mensagem", variant = null) {
			this.$bvToast.toast(msg, {
				title: titulo,
				autoHideDelay: 4500,
				appendToast: true,
				variant,
				toaster: "b-toaster-bottom-right",
			});
		},
		voltar() {
			this.$router.push({ path: "/" });
		},
	},
};
</script>

<style>
.btn.mt-5 {
  margin-top: 32px !important;
}
</style>
