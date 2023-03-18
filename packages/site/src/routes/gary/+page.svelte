<script lang="ts">
  import { getVCardUrl } from './vcard';

  interface QROptions {
    caption: string;
    from: string;
    src: string;
  }

  let sortable = '';

  const qrs: QROptions[] = [
    {
      src: 'qr/minimal-a.png',
      from: 'https://www.qrcode-monkey.com/#',
      caption: 'contact a',
    },
    {
      src: getVCardUrl([
        'N:Gary Bortosky',
        'TEL:13146090415',
        'URL:bortosky.com/gary',
        'EMAIL:gary@bortosky.com',
      ]).toString(),
      from: 'https://zxing.org',
      caption: 'contact b',
    },
  ];
  // qrs.forEach(addQR);
</script>

<section class="qrs">
  {#each qrs as qr}
    <div class="qr">
      <img src={qr.src} alt="contact qr" title={qr.from} />
      <div class="caption">{qr.caption}</div>
    </div>
  {/each}
</section>

<style lang="scss">
  .qrs {
    align-items: center;
    flex-direction: column;
    display: flex;
    gap: 5em;
  }
  .qrs .qr img {
    width: 300px;
    height: 300px;
  }
  .qrs .qr .caption {
    font-size: 2rem;
    text-align: center;
  }

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
