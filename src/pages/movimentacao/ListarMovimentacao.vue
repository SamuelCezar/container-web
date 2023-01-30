<template>
	<div id="app" style="background:#d3dbe2">
		<cabecalho titulo = "Listar Movimentações" descricao = "Listagem das Movimentações já Cadastradas no Sistema"/>
		<div  style="margin-top: -4%" class="container bg-white shadow p-5 mb-5 bg-white rounded mt-n5">
			<b-form-row class="col-12 p-0">
				<b-form-group class="col-6 p-0" style="display:flex; justify-content:flex-start;">
					<b-button v-on:click="abrirModalInserirMovimentacao()" variant="primary">
						Inserir Movimentação
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
					id="tableMovimentacoes"
					striped
					hover
					v-bind:items="movimentacoes"
					v-bind:fields="tableMovimentacaoFields"
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
						<p style="text-align: center;">{{tableMovimentacao_emptyMessage}}</p>
					</template>

					<template v-slot:cell(index)="data">{{data.index + 1}}</template>

					<template v-slot:cell(tipoMovimentacao)="data"><p class="text-capitalize">{{data.item.tipoMovimentacao}}</p></template>

					<template v-slot:cell(inicio)="data">{{data.item.dataHoraInicio}}</template>

					<template v-slot:cell(fim)="data">{{data.item.dataHoraFim}}</template>

					<template v-slot:cell(container)="data">{{"Cliente: " + data.item.container.cliente + " / Nº : " + data.item.container.numeroContainer}}</template>

					<template v-slot:cell(movimentacoes)="data">
						<b-button
							v-on:click="abrirModalMovimentacoes(data.item.id)"
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
							<b-dropdown-item v-on:click="abrirModalDeletarMovimentacao(data.item.id)">
								<font-awesome-icon icon="trash-alt" fixed-width />Deletar
							</b-dropdown-item>
						</b-dropdown>
					</template>
				</b-table>

				<b-pagination
					align="center"
				/>

				<b-modal id="modal-deletar-movimentacao" hide-footer centered>
					<template v-slot:modal-title>Deletar Movimentação?</template>
					<div class="d-block text-center">
						<h5>Tem certeza que deseja deletar esta Movimentação?</h5>
					</div>
					<div>
						<b-button
							style="margin-right: 15px"
							class="mt-3"
							v-on:click="deletarMovimentacao()"
							variant="primary"
							v-bind:disabled="loadingDeletarMovimentacao"
						>
							<font-awesome-icon
								v-show="loadingDeletarMovimentacao"
								icon="circle-notch"
								spin
								fixed-width
							/>Sim
						</b-button>
						<b-button
							class="mt-3 ml-3"
							v-on:click="$bvModal.hide('modal-deletar-movimentacao')"
							variant="danger"
						>Não</b-button>
					</div>
				</b-modal>
			</div>
		</div>

		<b-modal id="modal-inserir-movimentacao" hide-footer centered size="xl">
			<template v-slot:modal-title>Inserir Movimentação </template>
			<inserirMovimentacao
			v-on:inclusao-sucesso="inclusaoMovimentacaoSucesso"/>
		</b-modal>

		<b-modal id="modal-editar-movimentacao" hide-footer centered size="xl">
			<template v-slot:modal-title>Editar Movimentação </template>
			<editarMovimentacao
			:movimentacaoParaEdicao ="movimentacao"
			v-on:edicao-sucesso="edicaoMovimentacaoSucesso"/>
		</b-modal>
	</div>
</template>

<script>
import axios from "axios";
import InserirMovimentacao from "../../components/movimentacoes/InserirMovimentacao.vue";
import EditarMovimentacao from "../../components/movimentacoes/EditarMovimentacao.vue"

export default {
	components: {
		inserirMovimentacao: InserirMovimentacao,
		editarMovimentacao: EditarMovimentacao,
	},
	data() {
		return {
			movimentacoes: [],
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
				{
					key: "container",
					label: "Container",
				},
				{
					key: "acoes",
					label: "Ações",
				},
			],
			isBusy: false,
			tableMovimentacao_emptyMessage: "Nenhuma Movimentação Encontrada ",

			loadingDeletarMovimentacao: false,
		};
	},

	created() {
		this.consultarMovimentacoes();
	},
	methods: {
		abrirModalInserirMovimentacao() {
			this.$bvModal.show("modal-inserir-movimentacao")
		},
		inclusaoMovimentacaoSucesso() {
			this.consultarMovimentacoes();
			this.mensagem("Movimentação incluída com sucesso!", "Sucesso", "success");
			this.$bvModal.hide("modal-inserir-movimentacao");
		},
		edicaoMovimentacaoSucesso() {
			this.consultarMovimentacoes();
			this.mensagem("Movimentação editada com sucesso!", "Sucesso", "success");
			this.$bvModal.hide("modal-editar-movimentacao");
		},
		consultarMovimentacoes() {
			this.isBusy = true;
			this.tableMovimentacao_emptyMessage = "Nenhuma Movimentação Encontrada";
			axios
				.get(this.$pathManager.consultarMovimentacoes())
				.then((response) => {
					this.movimentacoes = response.data;
					this.isBusy = false;
				})
				.catch((exception) => {
					console.log("Erro: " + exception);
					this.cartorios = [];
					this.isBusy = false;
				});
		},
		editar(movimentacao) {
			this.movimentacao = movimentacao;
			this.$bvModal.show("modal-editar-movimentacao");
		},
		abrirModalDeletarMovimentacao(idMovimentacao) {
			this.idMovimentacaoParaDeletar = idMovimentacao;
			this.$bvModal.show("modal-deletar-movimentacao");
		},
		deletarMovimentacao() {
			if (this.idMovimentacaoParaDeletar == 0 || this.loadingDeletarMovimentacao) {
				return;
			}

			this.loadingDeletarMovimentacao = true;

			axios
				.delete(this.$pathManager.deletarMovimentacao(this.idMovimentacaoParaDeletar))
				.then(() => {
					this.mensagem("Movimentação deletada com sucesso.", "Sucesso", "success");
					this.consultarMovimentacoes();
					this.idMovimentacaoParaDeletar = 0;
				})
				.catch((error) => {
					console.log(error);
					this.mensagem("Erro ao deletar Movimentação.", "Erro", "danger");
				})
				.finally(() => {
					this.loadingDeletarMovimentacao = false;
					this.$bvModal.hide("modal-deletar-movimentacao");
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
