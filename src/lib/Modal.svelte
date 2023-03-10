<script lang="ts" context="module">
	export let show = () => {
		if (searchModal) searchModal.show();
	};
	export let hide = () => {
		if (searchModal) searchModal.close();
	};
	export let toggle = () => {
		if (searchModal) {
			searchModal.open ? hide() : show();
		}
	};
	let searchModal: HTMLDialogElement;
</script>

<script lang="ts">
	export let visible: boolean;
</script>

<dialog open="{visible}" bind:this="{searchModal}">
	<slot />
</dialog>

<style>
	dialog {
		position: fixed;
		top: calc(var(--NAVBAR-HEIGHT) + 3rem);
		background: none;
		border: none;
		z-index: 1;
	}

	dialog::backdrop {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.8);
	}
</style>
