<script lang="ts">
  import { qrs } from '$lib/quick-response';
</script>

<section class="qrs">
  {#each qrs as qr, i}
    <a href="./qr/{i}#go">
      <div class="qr">
        <img src={qr.src} alt="contact qr" title={qr.from} />
        <div class="caption">{qr.caption}</div>
      </div>
    </a>
  {/each}
</section>

<style lang="scss">
  .qrs {
    align-items: center;
    flex-direction: column;
    display: flex;
    gap: 1em;
    .qr {
      border: thin solid #ccc;
      img {
        width: 300px;
      }
      .caption {
        text-align: center;
      }
    }
  }
  // .qrs .qr img {
  //   margin: 8em 0;
  //   width: 300px;
  //   height: 300px;
  // }
  // .qrs .qr .caption {
  // }

  @media screen and (min-width: 576px) {
    /* landscape phones */
  }
  @media screen and (min-width: 768px) {
    /* tablets */
  }
  @media screen and (min-width: 992px) {
    /* desktops */
  }
  @media screen and (min-width: 1200px) {
    /* large desktops */
  }
  @media screen and (min-width: 1400px) {
    /* larger desktops */
  }
</style>
