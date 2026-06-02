<script lang="ts">
  import { resolve } from "$app/paths";

  let packName = $state("");
</script>

<div class="vp">
  <h1>Welcome</h1>

  <p>
    The only family information available at this time is <a href="gary">
      Gary's
    </a>
  </p>

  <div class="pm-container">
    <svg
      class="npm"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="540px"
      height="210px"
      viewBox="0 0 18 7"
    >
      <path
        fill="#CB3837"
        d="M0,0h18v6H9v1H5V6H0V0z M1,5h2V2h1v3h1V1H1V5z M6,1v5h2V5h2V1H6z M8,2h1v2H8V2z M11,1v4h2V2h1v3h1V2h1v3h1V1H11z"
      />
      <polygon fill="#FFFFFF" points="1,5 3,5 3,2 4,2 4,5 5,5 5,1 1,1 " />
      <path fill="#FFFFFF" d="M6,1v5h2V5h2V1H6z M9,4H8V2h1V4z" />
      <polygon
        fill="#FFFFFF"
        points="11,1 11,5 13,5 13,2 14,2 14,5 15,5 15,2 16,2 16,5 17,5 17,1 "
      />
    </svg>
    <input type="text" bind:value={packName} placeholder="package-name" />
    <a class="button-a" href="/package-explorer/?p={packName}">Explore</a>
  </div>
  <div class="clock">
    <a href={resolve("/metronome/")}>metronome</a>
  </div>
</div>

<style>
  .vp {
    border: 0.5rem;
  }
  .pm-container {
    background-color: white;
    box-shadow:
      0px 2px 4px rgba(0, 0, 0, 0.05),
      0px 10px 20px rgba(0, 0, 0, 0.1);
    margin: 1rem auto;
    padding: 3rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;

    width: fit-content;
    align-items: center;
    gap: 0.5rem;
  }
  a {
    text-decoration: underline;
  }
  svg.npm {
    width: 5rem;
    height: 5rem;
  }

  @media screen and (min-width: 576px) {
    /* landscape phones */
  }
  @media screen and (min-width: 768px) {
    /* tablets */
    .pm-container {
      flex-direction: row;
    }
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
