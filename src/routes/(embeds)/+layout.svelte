<script>
  import { base } from '$app/paths';
</script>

<section class="embed-vp">
  <nav class="crumbs">
    <ol>
      <li class="crumb"><a href="{base}/">Home</a></li>
      <li class="crumb"><a href="{base}/gary/">Gary</a></li>
      <li class="crumb">Jump Bike 3000</li>
    </ol>
  </nav>
  <div class="block">
    <slot />
  </div>
</section>

<style>
  .embed-vp {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  nav {
    border-bottom: 1px solid black;
    flex: 0 1 auto;
  }

  .crumbs ol {
    list-style-type: none;
    padding-left: 0;
  }

  .crumb {
    display: inline-block;
  }

  .crumb a::after {
    display: inline-block;
    color: #000;
    content: '>';
    font-weight: bold;
    padding: 0 3px;
  }

  .block {
    flex: 1 1 auto;
    border: thin solid silver;
  }
</style>
