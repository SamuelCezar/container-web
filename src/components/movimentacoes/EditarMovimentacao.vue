<template>
	<b-form class="col-12 p-0" v-on:submit="inserirMovimentacao()">
		<b-form-row style="display: flex" class="col-12 p-0">
			<b-col cols="2">
				<b-form-group class="p-3" style="margin-left: -5px; margin-right: -5px" label="Tipo: " >
					<b-form-select v-model="movimentacao.tipoMovimentacao" id="tipoMovimentacao" v-bind:class="'form-control' + (tipo_valido == false ? ' is-invalid' : '')">
						<b-form-select-option v-bind:value="movimentacao.tipoMovimentacao">
							{{ movimentacao.tipoMovimentacao }}
						</b-form-select-option>
						<b-form-select-option
							v-for="(tipoMovimentacao, index) in tiposMovimentacao"
							:key="index"
							v-bind:value="tipoMovimentacao.value"
							>
							{{ tipoMovimentacao.text }}
						</b-form-select-option>
					</b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="3">
				<b-form-group class= "p-3"  label="Data/Hora Inicio">
					<the-mask
						v-bind:class="'form-control' + (dataHoraInicio_valida == false ? ' is-invalid' : '')"
						:mask="'##/##/#### ##:##:##'"
						type="text"
						placeholder="Insira a Data/Hora de Início"
						v-model="movimentacao.dataHoraInicio"
					/>
				</b-form-group>
			</b-col>
			<b-col cols="3">
				<b-form-group class="p-3" label="Data/Hora Fim " >
					<the-mask
						v-bind:class="'form-control' + (dataHoraFim_valida == false ? ' is-invalid' : '')"
						:mask="'##/##/#### ##:##:##'"
						type="text"
						placeholder="Insira a Data/Hora de Fim"
						v-model="movimentacao.dataHoraFim"
					/>
				</b-form-group>
			</b-col>
			<b-col cols="3">
				<b-form-group class="p-3" label="Container: " >
					<b-form-select v-model="movimentacao.container" id="movimentacaoContainer" v-bind:class="'form-control' + (container_valido == false ? ' is-invalid' : '')">
						<b-form-select-option v-bind:value="movimentacao.container">
							{{ containerPreSelecionado.numeroContainer }}
						</b-form-select-option><b-form-select-option
							v-for="(container, index) in containers"
							:key="index"
							v-bind:value="container"
							>
							{{ container.numeroContainer }}
						</b-form-select-option>
					</b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="1">
				<b-button style="margin-top: 48px;" v-on:click="editarMovimentacao()" variant="primary" v-bind:disabled="loadingEditarMovimentacao">
					<font-awesome-icon v-show="loadingEditarMovimentacao" icon="circle-notch" spin fixed-width />Salvar
				</b-button>
			</b-col>
		</b-form-row>
	</b-form>
</template>

<script>
import axios from "axios";

export default {
	props: {
		movimentacaoParaEdicao: {
			type: Object,
		},
	},
	data() {
		return {
			movimentacao: {
				id: "",
				tipoMovimentacao: "",
				dataHoraInicio: "",
				dataHoraFim: "",
				container: "",
			},

			containers: [],
			containerPreSelecionado: "",

			tiposMovimentacao: [
				{ text: "Embarque", value: "embarque" },
				{ text: "Descarga", value: "descarga" },
				{ text: "Gate In", value: "gate in" },
				{ text: "Gate Out", value: "gate out" },
				{ text: "Reposicionamento", value: "reposicionamento" },
				{ text: "Pesagem", value: "pesagem" },
				{ text: "Scanner", value: "scanner" },
			],

			loadingEditarMovimentacao: false,

			tipo_valido: null,
			dataHoraInicio_valida: null,
			dataHoraFim_valida: null,
			container_valido: null,

		};
	},
	created() {
		this.listarContainers();
		this.movimentacao = this.movimentacaoParaEdicao;
		this.containerPreSelecionado = this.movimentacao.container;
	},
	methods: {
		editarMovimentacao() {
			this.formataDataEHoraMovimentacoes();
			console.log(this.movimentacao);
			if (!this.validateForm()) {
				return;
			}

			this.loadingEditarMovimentacao = true;

			axios
				.put(this.$pathManager.editarMovimentacao(), this.movimentacao)
				.then(() => {
					this.loadingEditarMovimentacao = false;
					this.$emit("edicao-sucesso");
				})
				.catch((exception) => {
					this.loadingEditarMovimentacao = false;
					this.mensagem(
						"Erro ao editar Movimentação: " + exception.response.data,
						"Erro",
						"danger",
					);
				});
		},
		listarContainers() {
			this.isBusy = true;
			this.tableContainer_emptyMessage = "Nenhum Container Encontrado";
			axios
				.get(this.$pathManager.listarContainers())
				.then((response) => {
					this.containers = response.data;
					this.isBusy = false;
				})
				.catch((exception) => {
					console.log("Erro: " + exception);
					this.cartorios = [];
					this.isBusy = false;
				});
		},
		mensagem(msg = "", titulo = "Mensagem", variant = null) {
			this.$bvToast.toast(msg, {
				title: titulo,
				autoHideDelay: 6000,
				appendToast: false,
				variant,
				toaster: "b-toaster-bottom-right",
			});
		},
		formataDataEHoraMovimentacoes() {
			const dataInicio = this.movimentacao.dataHoraInicio;
			const dataFim = this.movimentacao.dataHoraFim;

			if (dataInicio.length == 14) {
				this.movimentacao.dataHoraInicio = dataInicio.substring(0,2) + "/" + dataInicio.substring(2,4) + "/" 
				+ dataInicio.substring(4,8) + " " + dataInicio.substring(8,10) + ":" + dataInicio.substring(10,12) + ":" 
				+ dataInicio.substring(12,14);
			}

			if(dataFim.length == 14) {
				this.movimentacao.dataHoraFim = dataFim.substring(0,2) + "/" + dataFim.substring(2,4) + "/" 
				+ dataFim.substring(4,8) + " " + dataFim.substring(8,10) + ":" + dataFim.substring(10,12) + ":" 
				+ dataFim.substring(12,14);
			}

		},
		validateForm() {
			let formValido = true;

			if (this.movimentacao.tipoMovimentacao == "" || this.movimentacao.tipoMovimentacao == undefined) {
				formValido = false;
				this.tipo_valido = false;
			}

			if (this.movimentacao.dataHoraInicio == "" || this.movimentacao.dataHoraInicio.length < 14) {
				formValido = false;
				this.dataHoraInicio_valida = false;
			}

			if (this.movimentacao.dataHoraFim == "" || this.movimentacao.dataHoraFim.length < 14) {
				formValido = false;
				this.dataHoraFim_valida = false;
			}

			if (this.movimentacao.container == "" || this.movimentacao.container == undefined) {
				formValido = false;
				this.container_valido = false;
			}

			return formValido;
		},
	}
}
</script>
