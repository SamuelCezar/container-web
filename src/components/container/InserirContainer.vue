<template>
	<b-form class="col-12 p-0" v-on:submit="inserirContainer()">
		<b-form-row style="display: flex" class="col-12 p-0">
			<b-col cols="4">
				<b-form-group class= "p-3"  label="Cliente:">
					<b-form-input
						type="text"
						placeholder="Insira o nome do cliente"
						v-model="container.cliente"
					/>
					<b-alert class="col-12 mt-2 pl-md-0" v-bind:show="cliente_valido == false ? true : false" variant="danger">{{ "Cliente deve ter no minimo 4 caracteres." }}</b-alert>
				</b-form-group>
			</b-col>
			<b-col cols="3">
				<b-form-group class="p-3" label="Número do Container: " >
					<the-mask
						class="form-control"
						:mask="'AAAA#######'"
						type="text"
						placeholder="Insira o número do container"
						v-model="container.numeroContainer"
					/>
					<b-alert class="col-12 mt-2 pl-md-0" v-bind:show="numero_valido == false ? true : false" variant="danger">{{ "Padrão: ABCD1234567." }}</b-alert>
				</b-form-group>
			</b-col>
			<b-col cols="1">
				<b-form-group class="p-3" style="margin-left: -5px; margin-right: -5px" label="Tipo: " >
					<b-form-select v-model="container.tipoContainer" id="tipoContainer" v-bind:class="'form-control' + (tipo_valido == false ? ' is-invalid' : '')">
						<b-form-select-option
							v-for="(tipo, index) in tiposContainer"
							:key="index"
							v-bind:value="tipo.value"
							>
							{{ tipo.text }}
						</b-form-select-option>
					</b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="2">
				<b-form-group class="p-3" label="Categoria: " >
					<b-form-select v-model="container.categoria" id="categoriaContainer" v-bind:class="'form-control' + (categoria_valida == false ? ' is-invalid' : '')">
						<b-form-select-option
							v-for="(categoria, index) in categoriasContainer"
							:key="index"
							v-bind:value="categoria.value"
							>
							{{ categoria.text }}
						</b-form-select-option>
					</b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="1">
				<b-form-group class="p-1" style="margin-top: 13px;" label="Cheio: " >
					<b-form-checkbox v-model="container.cheio" style="margin-left: 15px"></b-form-checkbox>
				</b-form-group>
			</b-col>
			<b-col cols="0">
				<b-button style="margin-top: 48px; margin-left: -15px" v-on:click="salvarContainer()" variant="primary" v-bind:disabled="loadingSalvarContainer">
					<font-awesome-icon v-show="loadingSalvarContainer" icon="circle-notch" spin fixed-width />Salvar
				</b-button>
			</b-col>
		</b-form-row>
	</b-form>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			container: {
				id: "",
				cliente: "",
				numeroContainer: "",
				tipoContainer: "",
				categoria: "",
				cheio: false,
			},

			tiposContainer: [
				{ text: "20", value: "20" },
				{ text: "40", value: "40" },
			],

			categoriasContainer: [
				{ text: "Importação", value: "importacao" },
				{ text: "Exportação", value: "exportação" },
			],

			loadingSalvarContainer: false,

			cliente_valido: null,
			tipo_valido: null,
			categoria_valida: null,
			numero_valido: null,

		};
	},
	created() {
	},
	methods: {
		salvarContainer() {
			if (!this.validateForm()) {
				return;
			}

			this.loadingSalvarContainer = true;

			axios
				.post(this.$pathManager.salvarContainer(), this.container)
				.then(() => {
					this.loadingSalvarContainer = false;
					this.$emit("inclusao-sucesso");
				})
				.catch((exception) => {
					this.loadingSalvarContainer = false;
					this.mensagem(
						"Erro ao inserir Container: " + exception.response.data,
						"Erro",
						"danger",
					);
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
		validateForm() {
			let formValido = true;

			if (this.container.cliente == "" || this.container.cliente.length < 4) {
				formValido = false;
				this.cliente_valido = false;
			}

			if (this.container.tipoContainer == "" || this.container.tipoContainer == undefined) {
				formValido = false;
				this.tipo_valido = false;
			}

			if (this.container.categoria == "" || this.container.categoria == undefined) {
				formValido = false;
				this.categoria_valida = false;
			}

			if (this.container.numeroContainer == "" || this.container.numeroContainer.length < 11) {
				formValido = false;
				this.numero_valido = false;
			}

			return formValido;
		},
	}
}
</script>
