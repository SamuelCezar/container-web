<template>
	<div id="app" style="background:#d3dbe2">
		<cabecalho titulo = "Listar Containers" descricao = "Listagem dos Containers já Cadastrados no Sistema"/>
		<div  style="margin-top: -4%" class="container bg-white shadow p-5 mb-5 bg-white rounded mt-n5">
			<b-form-row class="col-12 p-0">
				<b-form-group class="col-6 p-0" style="display:flex; justify-content:flex-start;">
					<b-button v-on:click="abrirModalInserirContainer()" variant="primary">
						Inserir Container
					</b-button>
				</b-form-group>
				<b-form-group class="col-6 p-0" style="display:flex; justify-content:flex-end;">
					<b-button v-on:click="voltar()" variant="primary">
						<b-icon icon="arrow-left" variant="light" font-scale="1" class="cursor-pointer"/>
						Voltar
					</b-button>
				</b-form-group>
			</b-form-row>

			<div>
				<b-table
					id="tableContainers"
					striped
					hover
					v-bind:items="containers"
					v-bind:fields="tableContainerFields"
					v-bind:busy="isBusy"
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
						<p style="text-align: center;">{{tableContainer_emptyMessage}}</p>
					</template>

					<template v-slot:cell(index)="data">{{data.index + 1}}</template>

					<template v-slot:cell(cliente)="data">{{data.item.cliente}}</template>

					<template v-slot:cell(numeroContainer)="data">{{data.item.numeroContainer}}</template>

					<template v-slot:cell(categoria)="data">{{data.item.categoria == "importacao" ? "Importação" : "Exportação"}}</template>

					<template v-slot:cell(tipoContainer)="data">{{data.item.tipoContainer}}</template>

					<template v-slot:cell(cheio)="data">{{data.item.cheio == true ? "Cheio" : "Vazio"}}</template>

					<template v-slot:cell(movimentacoes)="data">
						<b-button
							v-on:click="abrirModalMovimentacoes(data.item)"
							variant="primary"
						>
						Visualizar
						</b-button>
					</template>

					<template v-slot:cell(acoes)="data">
						<b-dropdown right boundary="window" text="Selecione" variant="primary">
							<b-dropdown-item  v-on:click="editar(data.item)">
								<font-awesome-icon icon="edit" fixed-width />Editar
							</b-dropdown-item>
							<b-dropdown-item v-on:click="abrirModalDeletarContainer(data.item.id)">
								<font-awesome-icon icon="trash-alt" fixed-width />Deletar
							</b-dropdown-item>
						</b-dropdown>
					</template>
				</b-table>

				<b-pagination
					align="center"
				/>

				<b-modal id="modal-deletar-container" hide-footer centered>
					<template v-slot:modal-title>Deletar Container?</template>
					<div class="d-block text-center">
						<h5>Tem certeza que deseja deletar este Container?</h5>
					</div>
					<div>
						<b-button
							style="margin-right: 15px"
							class="mt-3"
							v-on:click="deletarContainer()"
							variant="primary"
							v-bind:disabled="loadingDeletarContainer"
						>
							<font-awesome-icon
								v-show="loadingDeletarContainer"
								icon="circle-notch"
								spin
								fixed-width
							/>Sim
						</b-button>
						<b-button
							class="mt-3 ml-3"
							v-on:click="$bvModal.hide('modal-deletar-container')"
							variant="danger"
						>Não</b-button>
					</div>
				</b-modal>
			</div>
		</div>

		<b-modal id="modal-inserir-container" hide-footer centered size="xl">
			<template v-slot:modal-title>Inserir Container </template>
			<inserirContainer
			v-on:inclusao-sucesso="inclusaoContainerSucesso"/>
		</b-modal>

		<b-modal id="modal-editar-container" hide-footer centered size="xl">
			<template v-slot:modal-title>Editar Container </template>
			<editarContainer
			:containerParaEdicao ="container"
			v-on:edicao-sucesso="edicaoContainerSucesso"/>
		</b-modal>

		<b-modal id="modal-movimentacoes-container" hide-footer centered size="xl">
			<template v-slot:modal-title>Movimentações deste Container</template>
			<movimentacaoPorContainer
			:containerParaListarMovimentacoes ="container"/>
		</b-modal>

	</div>
</template>

<script>
import axios from "axios";
import InserirContainer from "../../components/container/InserirContainer.vue";
import EditarContainer from "../../components/container/EditarContainer.vue"
import MovimentacaoContainer from "../../components/movimentacoes/MovimentacoesPorContainer.vue"

export default {
	components: {
		inserirContainer: InserirContainer,
		editarContainer: EditarContainer,
		movimentacaoPorContainer: MovimentacaoContainer,
	},
	data() {
		return {
			containers: [],
			container: null,

			tableContainerFields: [
				{
					key: "index",
					label: "#",
				},
				{
					key: "cliente",
					label: "Cliente",
				},
				{
					key: "numeroContainer",
					label: "Número do Container",
				},
				{
					key: "categoria",
					label: "Categoria",
				},
				{
					key: "tipoContainer",
					label: "Tipo",
				},
				{
					key: "cheio",
					label: "Status",
				},
				{
					key: "movimentacoes",
					label: "Movimentações",
				},
				{
					key: "acoes",
					label: "Ações",
				},
			],
			isBusy: false,
			tableContainer_emptyMessage: "Nenhum Container Encontrado ",

			loadingDeletarContainer: false,
		};
	},

	created() {
		this.listarContainers();
	},
	methods: {
		abrirModalMovimentacoes(container) {
			this.container = container;
			this.$bvModal.show("modal-movimentacoes-container")
		},
		abrirModalInserirContainer() {
			this.$bvModal.show("modal-inserir-container")
		},
		inclusaoContainerSucesso() {
			this.listarContainers();
			this.mensagem("Container incluído com sucesso!", "Sucesso", "success");
			this.$bvModal.hide("modal-inserir-container");
		},
		edicaoContainerSucesso() {
			this.listarContainers();
			this.mensagem("Container editado com sucesso!", "Sucesso", "success");
			this.$bvModal.hide("modal-editar-container");
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
		editar(container) {
			this.container = container;
			this.$bvModal.show("modal-editar-container");
		},
		abrirModalDeletarContainer(idContainer) {
			this.idContainerParaDeletar = idContainer;
			this.$bvModal.show("modal-deletar-container");
		},
		deletarContainer() {
			console.log(this.idContainerParaDeletar);
			if (this.idContainerParaDeletar == 0 || this.loadingDeletarContainer) {
				return;
			}

			this.loadingDeletarContainer = true;

			axios
				.delete(this.$pathManager.deletarContainer(this.idContainerParaDeletar))
				.then(() => {
					this.mensagem("Container deletado com sucesso.", "Sucesso", "success");
					this.listarContainers();
					this.idContainerParaDeletar = 0;
				})
				.catch((error) => {
					console.log(error);
					this.mensagem("Erro ao deletar Container.", "Erro", "danger");
				})
				.finally(() => {
					this.loadingDeletarContainer = false;
					this.$bvModal.hide("modal-deletar-container");
				});
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
