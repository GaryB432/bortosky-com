<script>
  import { base } from '$app/paths';
</script>

<div class="tree">
  <div class="tree-item">
    <a href="{base}/gary">Gary</a>
    <div class="tree-item">
      <a href="{base}/gary/theater">Theater</a>
    </div>
    <div class="tree-item">
      <a href="{base}/gary/projects">Projects</a>
    </div>
  </div>
  <div class="tree-item">
    <a href="{base}/utilities">Tools and Utilities</a>
  </div>
  <div class="tree-item">
    <a href="{base}/privacy-terms">Privacy and Terms</a>
  </div>
</div>

<style>
  .tree {
    padding: 3em;
  }

  .tree-item {
    padding: 0.25em 1em;
  }
</style>
