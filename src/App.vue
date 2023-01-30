<template>
  <div id="root">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
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
/* .menu-btn-a-icon-right img {
  margin-top: 2px;
  margin-left: 2px;
} */
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
