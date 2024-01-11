<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
</script>

<nav>
  <ul>
    <li class:active={$page.route.id === "/(app)"}>
      <a href="{base}/">Home</a>
    </li>
    <li class:active={$page.route.id === "/(app)/gary"}>
      <a href="{base}/gary">Gary</a>
    </li>
    <li class:active={$page.route.id === "/(app)/utilities"}>
      <a href="{base}/utilities">Tools</a>
    </li>
    <li class:active={$page.route.id === "/(app)/privacy-terms"}>
      <a href="{base}/privacy-terms">Privacy and Terms</a>
    </li>
  </ul>
</nav>

<style lang="scss">
  nav {
    ul {
      display: flex;
      align-items: center;
      gap: 1rem;
      li.active {
        background-color: #ccc;
        padding: .5rem 1rem;
        border-radius: 3px;
        outline: thin solid black;
      }
    }
  }
</style>
