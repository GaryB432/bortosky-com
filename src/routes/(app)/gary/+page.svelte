<script lang="ts">
  import { base } from "$app/paths";
  import { qrs } from "$lib/shared/quick-response";
</script>

<h1>Gary&apos;s Things</h1>
<section class="container">
  <a href="{base}/gary/projects">
    <svg
      viewBox="0 0 1024 1024"
      class="icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M416 425.6l78.4 44.8c9.6 6.4 16 16 16 27.2v91.2c0 11.2-6.4 22.4-16 27.2L416 662.4c-9.6 6.4-22.4 6.4-32 0l-78.4-44.8c-9.6-6.4-16-16-16-27.2v-91.2c0-11.2 6.4-22.4 16-27.2l78.4-44.8c9.6-8 22.4-8 32-1.6z"
        fill="#2F4BFF"
      />
      <path
        d="M643.2 267.2c-3.2-1.6-4.8-1.6-8 0l-67.2 38.4c-3.2 1.6-3.2 4.8-3.2 6.4v76.8c0 3.2 1.6 4.8 3.2 6.4l67.2 38.4c3.2 1.6 4.8 1.6 8 0l67.2-38.4c3.2-1.6 3.2-4.8 3.2-6.4v-76.8c0-3.2-1.6-4.8-3.2-6.4l-67.2-38.4z m9.6-12.8l67.2 38.4c8 4.8 12.8 12.8 12.8 20.8v76.8c0 8-4.8 16-12.8 20.8l-67.2 38.4c-8 4.8-16 4.8-24 0l-67.2-38.4c-8-4.8-12.8-12.8-12.8-20.8v-76.8c0-8 4.8-16 12.8-20.8l67.2-38.4c6.4-4.8 16-4.8 24 0zM688 691.2l-67.2 38.4v76.8l67.2 38.4 67.2-38.4v-76.8L688 691.2z m83.2 9.6c9.6 6.4 16 16 16 27.2v76.8c0 11.2-6.4 22.4-16 27.2L704 873.6c-9.6 6.4-22.4 6.4-32 0l-67.2-38.4c-9.6-6.4-16-16-16-27.2v-76.8c0-11.2 6.4-22.4 16-27.2l67.2-38.4c9.6-6.4 22.4-6.4 32 0l67.2 35.2zM176 169.6v44.8l40 22.4 40-22.4v-44.8l-40-22.4-40 22.4zM275.2 144c8 4.8 12.8 12.8 12.8 20.8v54.4c0 8-4.8 16-12.8 20.8l-48 27.2c-8 4.8-16 4.8-24 0l-48-27.2c-6.4-4.8-11.2-12.8-11.2-20.8v-54.4c0-8 4.8-16 12.8-20.8l48-27.2c8-4.8 16-4.8 24 0L275.2 144zM192 777.6l-48 27.2v54.4l48 27.2 48-27.2v-54.4l-48-27.2z m8-14.4l48 27.2c4.8 3.2 8 8 8 14.4v54.4c0 6.4-3.2 11.2-8 14.4l-48 27.2c-4.8 3.2-11.2 3.2-16 0l-48-27.2c-4.8-3.2-8-8-8-14.4v-54.4c0-6.4 3.2-11.2 8-14.4l48-27.2c4.8-3.2 11.2-3.2 16 0z"
        fill="#050D42"
      />
      <path
        d="M403.2 776l-62.4 62.4c-1.6 1.6-3.2 1.6-6.4 1.6h-88c-4.8 0-8-3.2-8-8s3.2-8 8-8h84.8l59.2-59.2v-68.8c0-4.8 3.2-8 8-8s8 3.2 8 8v64H576c4.8 0 8 3.2 8 8s-3.2 8-8 8H403.2z m-11.2-436.8l-108.8-94.4c-3.2-3.2-3.2-8-1.6-11.2 3.2-3.2 8-3.2 11.2-1.6l110.4 94.4H528c4.8 0 8 3.2 8 8s-3.2 8-8 8h-120V400c0 4.8-3.2 8-8 8s-8-3.2-8-8v-60.8zM800 728c-4.8 0-8-3.2-8-8s3.2-8 8-8h88c4.8 0 8 3.2 8 8s-3.2 8-8 8H800z m-49.6-435.2c-3.2 3.2-8 3.2-11.2 1.6-3.2-3.2-3.2-8-1.6-11.2l96-112c3.2-3.2 8-3.2 11.2-1.6 3.2 3.2 3.2 8 1.6 11.2l-96 112zM160 504c-4.8 0-8-3.2-8-8s3.2-8 8-8h112c4.8 0 8 3.2 8 8s-3.2 8-8 8h-112z m536 144c0 4.8-3.2 8-8 8s-8-3.2-8-8V544c0-4.8 3.2-8 8-8s8 3.2 8 8v104z"
        fill="#050D42"
      />
    </svg>
    <div>Open Source Software Projects</div>
  </a>
  <a href="{base}/gary/theater">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      viewBox="0 0 256 256"
      xml:space="preserve"
    >
      <g
        style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
      >
        <path
          d="M 37.965 26.644 c -2.073 0.751 -4.182 1.429 -6.277 2.007 c -9.501 2.62 -19.37 3.469 -29.338 2.521 L 0 30.949 l 0.286 2.343 c 3.094 25.314 11.38 38.654 25.33 40.783 l 0.539 0.082 l 0.5 -0.216 c 3.582 -1.547 6.576 -3.895 8.899 -6.977 c 1.248 -1.654 2.299 -3.526 3.178 -5.597 C 35.04 52.963 34.795 41.448 37.965 26.644 z M 15.399 48.329 c -0.301 0.144 -0.62 0.318 -0.963 0.531 c -0.357 0.23 -0.708 0.429 -1.019 0.942 c -0.257 -0.156 -0.44 -0.442 -0.547 -0.732 c -0.109 -0.289 -0.143 -0.592 -0.166 -0.895 c -0.017 -0.602 0.128 -1.185 0.378 -1.724 c 0.496 -1.074 1.511 -1.971 2.763 -2.344 c 1.255 -0.363 2.57 -0.161 3.57 0.442 c 0.502 0.307 0.944 0.704 1.269 1.205 c 0.296 0.492 0.584 1.14 0.351 1.735 c -0.549 -0.236 -0.952 -0.203 -1.38 -0.193 c -0.408 0.017 -0.774 0.049 -1.11 0.097 c -0.676 0.085 -1.188 0.23 -1.624 0.353 C 16.493 47.885 15.998 48.028 15.399 48.329 z M 31.324 59.774 c -0.551 -0.671 -1.191 -0.968 -1.841 -1.267 c -0.645 -0.283 -1.29 -0.499 -1.926 -0.657 c -1.272 -0.334 -2.479 -0.39 -3.594 -0.267 c -1.109 0.169 -2.261 0.529 -3.406 1.174 c -0.574 0.315 -1.144 0.687 -1.696 1.123 c -0.554 0.454 -1.098 0.901 -1.463 1.69 c -0.485 -0.773 -0.376 -1.823 -0.124 -2.67 c 0.266 -0.877 0.73 -1.679 1.315 -2.387 c 1.166 -1.415 2.932 -2.426 4.888 -2.694 c 1.96 -0.233 3.923 0.297 5.409 1.369 c 0.745 0.537 1.396 1.194 1.877 1.974 C 31.222 57.918 31.595 58.904 31.324 59.774 z M 32.19 47.399 c -0.428 -0.417 -0.818 -0.522 -1.221 -0.655 c -0.386 -0.12 -0.739 -0.208 -1.067 -0.27 c -0.656 -0.14 -1.173 -0.153 -1.623 -0.175 c -0.452 -0.003 -0.982 -0.014 -1.657 0.075 c -0.337 0.04 -0.699 0.101 -1.097 0.187 c -0.417 0.097 -0.815 0.166 -1.289 0.533 c -0.379 -0.517 -0.264 -1.218 -0.104 -1.77 c 0.187 -0.568 0.514 -1.065 0.922 -1.489 c 0.815 -0.838 2.038 -1.367 3.344 -1.33 c 1.305 0.048 2.512 0.658 3.264 1.57 c 0.377 0.458 0.665 0.985 0.802 1.571 c 0.055 0.299 0.099 0.599 0.067 0.907 C 32.502 46.86 32.397 47.183 32.19 47.399 z"
          style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(221,78,67); fill-rule: nonzero; opacity: 1;"
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        <path
          d="M 87.642 28.005 c -14.459 -0.578 -28.276 -4.299 -41.07 -11.058 l -2.087 -1.102 l -0.629 2.275 c -7.908 28.607 -4.946 46.618 9.055 55.063 l 0.467 0.282 l 0.545 -0.009 c 16.347 -0.273 27.952 -14.362 35.478 -43.073 L 90 28.099 L 87.642 28.005 z M 51.037 37.632 c 0.03 -0.34 0.137 -0.663 0.257 -0.979 c 0.266 -0.617 0.684 -1.145 1.185 -1.584 c 0.999 -0.876 2.432 -1.351 3.88 -1.205 c 1.447 0.16 2.728 0.911 3.538 1.946 c 0.404 0.523 0.714 1.113 0.864 1.763 c 0.127 0.628 0.18 1.409 -0.263 1.945 c -0.415 -0.503 -0.835 -0.697 -1.276 -0.912 c -0.425 -0.202 -0.828 -0.366 -1.215 -0.499 c -0.772 -0.275 -1.443 -0.399 -2.041 -0.469 c -0.598 -0.047 -1.263 -0.071 -2.061 0.052 c -0.399 0.054 -0.821 0.138 -1.272 0.257 c -0.469 0.13 -0.916 0.244 -1.409 0.674 C 51.051 38.343 51.006 37.974 51.037 37.632 z M 67.38 53.247 c -0.221 0.474 -0.522 0.912 -0.863 1.304 c -0.688 0.785 -1.541 1.408 -2.476 1.882 c -1.866 0.95 -4.156 1.225 -6.322 0.666 c -2.156 -0.599 -4 -1.988 -5.137 -3.747 c -0.571 -0.88 -0.996 -1.847 -1.196 -2.872 c -0.098 -0.511 -0.138 -1.041 -0.09 -1.562 c 0.06 -0.523 0.195 -1.055 0.508 -1.451 c 0.228 0.961 0.746 1.612 1.286 2.255 c 0.542 0.627 1.131 1.183 1.743 1.671 c 1.219 0.994 2.543 1.654 3.873 2.042 c 1.344 0.337 2.822 0.43 4.376 0.183 c 0.776 -0.114 1.564 -0.3 2.348 -0.571 c 0.79 -0.286 1.565 -0.59 2.242 -1.308 C 67.742 52.238 67.591 52.766 67.38 53.247 z M 73.531 42.665 c -0.054 0.333 -0.122 0.666 -0.267 0.975 c -0.144 0.311 -0.368 0.607 -0.657 0.762 c -0.207 -0.619 -0.536 -0.943 -0.875 -1.292 c -0.33 -0.331 -0.652 -0.616 -0.971 -0.863 c -0.63 -0.508 -1.218 -0.822 -1.761 -1.077 c -0.554 -0.235 -1.195 -0.464 -2 -0.614 c -0.4 -0.079 -0.831 -0.139 -1.299 -0.179 c -0.489 -0.037 -0.949 -0.081 -1.563 0.144 c -0.062 -0.323 0.026 -0.683 0.173 -0.991 c 0.145 -0.309 0.355 -0.572 0.574 -0.828 c 0.457 -0.486 1.021 -0.842 1.634 -1.091 c 1.221 -0.488 2.707 -0.495 4.037 0.098 c 1.324 0.605 2.323 1.734 2.746 2.993 C 73.514 41.333 73.61 41.999 73.531 42.665 z"
          style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(231,191,85); fill-rule: nonzero; opacity: 1;"
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
      </g>
    </svg>
    <div>Theater from his youth</div>
  </a>
  {#each qrs as qr, i}
    <a href="./qr/{i}#go">
      <img
        src={qr.src}
        width="150"
        height="150"
        alt="contact qr"
        title={qr.from}
      />
      <div class="caption">{qr.caption}</div>
    </a>
  {/each}
</section>

<!-- 


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

 
</style>
 -->

<style lang="scss">
  .container {
    max-width: 90vw;
    margin: 0 auto;
  }
  a {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: 150px 1fr;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
    padding: 0.5rem;
    img,
    svg {
      width: 100%;
    }
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
