<script lang="ts">
  import CookiePrompt from "./CookiePrompt.svelte";
  import AgePrompt from "./AgePrompt.svelte";

  let shouldPromptAge: boolean = false;
  let shouldPromptCookies: boolean = false;
</script>

<AgePrompt bind:shouldPrompt={shouldPromptAge}/>
<CookiePrompt bind:shouldPrompt={shouldPromptCookies}/>