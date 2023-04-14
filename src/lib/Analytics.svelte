<script lang="ts">
  export let measurementID: string;
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id={measurementID}"></script>
  <script data-measurementID="{measurementID}">
    let measurementID = document.currentScript.getAttribute('data-measurementID');
    console.log(measurementID)
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', measurementID);
  </script>
</svelte:head>
