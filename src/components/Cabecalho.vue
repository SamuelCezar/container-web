<template>
	<header class="bg-white py-5">
		<div class="container h-100">
			<div class="row h-100 mb-5 align-items-center">
				<div class="col-lg-3 text-center">
					<div class="bg-white rounded-lg p-3">
						<font-awesome-icon icon="fas fa-ship" style="width:150px; height:150px;" />
					</div>
				</div>
				<div class="col-lg-6">
					<h1 class="display-5 mb-2">{{titulo}}</h1>
					<p class="lead text-50">{{descricao}}</p>
				</div>
				<b-modal id="modal-alterar-senha" hide-footer centered>
					<template v-slot:modal-title>Alteração de senha</template>
					<div class="d-block">
						<b-form v-on:submit="alterarSenha()">
							<b-form-row class="col-12 p-0">
								<b-form-group class="col-md-12 col-sm-12 p-0 pr-md-3 pl-md-3 pr-sm-0" label="Senha atual:" label-for="senha">
									<b-form-input
										autocomplete="new-password"
										id="senhaAtual"
										type="password"
										v-model="requestAlterarSenha.senhaAtual"
										placeholder="Insira a Senha atual"
									/>
								</b-form-group>
							</b-form-row>
							<b-form-row class="col-12 p-0">
								<b-form-group class="col-md-12 col-sm-12 p-0 pr-md-3 pl-md-3 pr-sm-0" label="Nova Senha:" label-for="senha">
									<b-form-input
										autocomplete="new-password"
										id="novaSenha"
										type="password"
										v-model="requestAlterarSenha.novaSenha"
										placeholder="Insira a nova senha"
									/>
								</b-form-group>
							</b-form-row>
							<b-form-row class="col-12 p-0">
								<b-form-group class="col-md-12 col-sm-12 p-0 pr-md-3 pl-md-3 pr-sm-0" label="Confirmação da Nova Senha:" label-for="senha">
									<b-form-input
										autocomplete="new-password"
										id="confirmaNovaSenha"
										type="password"
										v-model="requestAlterarSenha.confirmaNovaSenha"
										placeholder="Confirme a nova senha"
									/>
								</b-form-group>
							</b-form-row>
						</b-form>
					</div>
					<div>
						<b-button class="mt-3" v-on:click="alterarSenha()" variant="primary" v-bind:disabled="loadingAlterarSenha">
							<font-awesome-icon v-show="loadingAlterarSenha" icon="circle-notch" spin fixed-width />Salvar
						</b-button>
					</div>
				</b-modal>
			</div>
		</div>
	</header>
</template>

<script>
import axios from "axios";

export default {
	props: [
		"titulo",
		"descricao",
	],
	data() {
		return {
			nomeUsuarioLogado: null,
			loadingAlterarSenha: false,
			requestAlterarSenha: {
				cpf: null,
				senhaAtual: null,
				novaSenha: null,
				confirmaNovaSenha: null,
			},
		};
	},
	created() {
		this.nomeUsuarioLogado = this.getNomeDoUsuarioLogado();
		this.requestAlterarSenha.cpf = this.getCpfDoUsuarioLogado();
	},
	methods: {
		sair() {
			this.$router.push({ path: "/" });
		},
		getNomeDoUsuarioLogado() {
			let usuarioLogado = localStorage.getItem("usuarioLogado");
			if (usuarioLogado != null) {
				usuarioLogado = JSON.parse(usuarioLogado);
				return usuarioLogado.username;
			}
			return null;
		},
		getCpfDoUsuarioLogado() {
			let usuarioLogado = localStorage.getItem("usuarioLogado");
			if (usuarioLogado != null) {
				usuarioLogado = JSON.parse(usuarioLogado);
				return usuarioLogado.cpf;
			}
			return null;
		},
		abrirModalAlterarSenha() {
			this.$bvModal.show("modal-alterar-senha");
		},
		alterarSenha() {
			this.loadingAlterarSenha = true;
			const formAlterarSenha = {
				cpf: this.requestAlterarSenha.cpf,
				senhaAtual: this.requestAlterarSenha.senhaAtual,
				novaSenha: this.requestAlterarSenha.novaSenha,
				confirmaNovaSenha: this.requestAlterarSenha.confirmaNovaSenha,
			};
			const formData = new FormData();
			formData.append("requestAlterarSenhaJSON", JSON.stringify(formAlterarSenha));
			axios
				.post(this.$pathManager.alterarSenha(), formData)
				.then((response) => {
					if (response.data != "") {
						const responseValidation = JSON.parse(response.data.replace("400 : ", ""))[0];
						for (let i = 0; i < responseValidation.length; i++) {
							this.mensagem(
								"Erro ao editar o Usuário: " + responseValidation[i].mensagem,
								"Erro",
								"danger",
							);
						}
					} else {
						this.mensagem("Senha alterada com sucesso.", "Sucesso", "success");
						this.$bvModal.hide("modal-alterar-senha");
						this.requestAlterarSenha.novaSenha = null;
						this.requestAlterarSenha.senhaAtual = null;
						this.requestAlterarSenha.confirmaNovaSenha = null;
					}
					this.loadingAlterarSenha = false;
				})
				.catch((exception) => {
					this.loadingSalvarUsuario = false;

					if (this.$route.params.idUsuario != undefined) {
						this.mensagem(
							"Erro ao alterar a senha: " + exception.response.data,
							"Erro",
							"danger",
						);
					} else {
						this.mensagem(
							"Erro ao alterar a senha: " + exception.response.data,
							"Erro",
							"danger",
						);
					}
					this.requestAlterarSenha.novaSenha = null;
					this.requestAlterarSenha.senhaAtual = null;
					this.requestAlterarSenha.confirmaNovaSenha = null;
					this.loadingAlterarSenha = false;
				});
		},
		mensagem(msg = "", titulo = "Mensagem", variant = null) {
			this.$bvToast.toast(msg, {
				title: titulo,
				autoHideDelay: 6000,
				appendToast: true,
				variant,
				toaster: "b-toaster-bottom-right",
			});
		},
	},
};
</script>
