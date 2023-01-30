<template>
	<div id="app" style="background:#F7F7F7; min-height:100vh;">
		<b-row>
			<div class="col-mb-12 col-lg-12 col-sm-12 d-flex justify-content-center">
				<b-img :src="require('./../../assets/img/faixaAzulAmarela.png')" fluid mh-100 />
			</div>
		</b-row>
		<b-row class="justify-content-center" style="margin-top:70px; margin-bottom:80px;">
			<div class="col-mb-6 col-lg-6 col-sm-12 d-flex justify-content-center">
				<!--<img src="./../assets/img/logo.jpg" width="60%" height="50%" />-->
				<h1 style="font-size: 80px"><font-awesome-icon icon="fas fa-ship" style="width:80px; height:80px;" />  Container App  <font-awesome-icon icon="fas fa-ship" style="width:80px; height:80px;" /></h1>
			</div>
		</b-row>
		<div class="container bg-white shadow p-5 mb-5 bg-white rounded mt-n5">
			<b-row>
				<b-col cols="12" style="display:flex; justify-content:center; ">
					<router-link to="/container/listar" class="menu-btn-a">
						<span class="menu-btn-a-text"> <small class="mb-1">Gerenciar</small> Container </span>
						<span class="menu-btn-a-icon-right">
							<span>
								<font-awesome-icon icon="fas fa-ship" style="width:50px; height:50px;" />
							</span>
						</span>
					</router-link>
					<router-link to="/movimentacao/listar" class="menu-btn-a">
						<span class="menu-btn-a-text"> <small class="mb-1">Gerenciar</small> Movimentações </span>
						<span class="menu-btn-a-icon-right">
							<span>
								<font-awesome-icon icon="fas fa-exchange-alt" style="width:50px; height:50px;" />
							</span>
						</span>
					</router-link>
					<router-link to="/relatorios" class="menu-btn-a">
						<span class="menu-btn-a-text"> <small class="mb-1">Emitir</small> Relatórios </span>
						<span class="menu-btn-a-icon-right">
							<span>
								<img src="./../../assets/img/relatorios.png" style="width:50px; height:50px;" />
							</span>
						</span>
					</router-link>
				</b-col>
			</b-row>
		</div>
		<footer>
			<div class="container">
				<p class="text-center">ContainerApp &copy; Samuel Chagas 2023</p>
			</div>
		</footer>
	</div>
</template>

<script>

export default {
	name: "app",
	data() {
		return {
		};
	},
	created() {
	},
	methods: {
		sair() {
			this.$router.push({ path: "/" });
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

<style scoped>
.display-5 {
	font-weight: 100 !important;
}
button svg {
	margin-right: 5px;
}

/*BOTOES MENU*/
.menu-btn-a {
	background: #cdd4db;
	padding-left: 90px;
	padding-right: 105px;
	height: 80px;
	display: inline-block;
	position: relative;
	/* box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.8) inset,
    1px 1px 3px rgba(0, 0, 0, 0.2); */
	border-radius: 20px;
	clear: both;
	margin: 0px 20px 20px 20px;
	overflow: hidden;
	transition: box-shadow 0.3s ease-in-out;
	font-family: Roboto, "Segoe UI", sans-serif;
	padding: 20px 105px 20px 20px;
	box-shadow: 0px 2px 5px 4px rgba(0, 0, 0, 0.4);
	text-decoration: none !important;
}

.menu-btn-a-text {
	padding-top: 9px;
	display: block;
	font-size: 22px;
	/*text-shadow:0px 1px 1px #545454;*/
	width: 150px;
	color: black;
	opacity: 0.7;
	font-weight: bold;
}
.menu-btn-a-text small {
	display: block;
	font-size: 18px;
	line-height: 0px;
	font-weight: 300;
}
.menu-btn-a-icon-right {
	position: absolute;
	right: 0px;
	top: 0px;
	height: 100%;
	width: 80px;
	border-left: 1px solid #5d81ab;
	background-color: #2d8cca;
}
.menu-btn-a-icon-right span {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin-left: 12px;
	margin-right: auto;
	margin-top: 15px;
	margin-bottom: auto;

	color: white;
}
.menu-btn-a:hover {
	box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.8) inset, 1px 1px 5px rgba(0, 0, 0, 0.4);
	text-decoration: none !important;
}
.menu-btn-a:active {
	position: relative;
	top: 1px;
	background: #b6c0c7;
	box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4) inset;
	border-color: #8994a0;
}
.menu-btn-a:active .menu-btn-a-text {
	color: #444;
}
.menu-btn-a:active .menu-btn-a-icon-right {
	border-left: 1px solid #8994a0;
}
</style>
