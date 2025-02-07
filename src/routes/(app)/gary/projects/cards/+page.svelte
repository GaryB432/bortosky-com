<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let title = $derived(`${data.projects.length} - Generated`);

  let ScardsWrapper: HTMLElement | null = $state(null);
  let Scards: NodeListOf<Element> | null = $derived(
    ScardsWrapper && document
      ? document.querySelectorAll(".card__content")
      : null,
  );

  onMount(() => {
    // Pass the number of cards to the CSS because it needs it to add some extra padding.
    // Without this extra padding, the last card won’t move with the group but slide over it.
    if (!Scards) {
      return;
    }
    // const numCards = Scards.length;
    // ScardsWrapper!.style.setProperty("--numcards", numCards.toString());

    // Each card should only shrink when it’s at the top.
    // We can’t use exit on the els for this (as they are sticky)
    // but can track ScardsWrapper instead.
    const viewTimeline = new ViewTimeline({
      subject: ScardsWrapper,
      axis: "block",
    });

    const numCards = Scards.length;

    Scards.forEach((Scard, index0) => {
      const index = index0 + 1;
      // const reverseIndex = numCards - index0;
      const reverseIndex0 = numCards - index;

      // Scroll-Linked Animation
      Scard.animate(
        {
          // Earlier cards shrink more than later cards
          transform: [`scale(1)`, `scale(${1 - 0.1 * reverseIndex0}`],
        },
        {
          timeline: viewTimeline,
          fill: "forwards",
          rangeStart: `exit-crossing ${CSS.percent((index0 / numCards) * 100)}`,
          rangeEnd: `exit-crossing ${CSS.percent((index / numCards) * 100)}`,
        },
      );
    });
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<header>
  <div>
    <h1>Stacking Cards</h1>
    <p>👇 Scroll down to see the effect.</p>
  </div>
</header>
<div class="warning">
  <p>
    ⚠️ Your browser does not support Scroll-driven Animations. Please use Chrome
    115 or newer.
  </p>
</div>
<main>
  <ul
    id="cards"
    bind:this={ScardsWrapper}
    style="--numcards: ${Scards?.length}"
  >
    <li class="card" id="card_1">
      <div class="card__content">
        <div>
          <h2>Card One</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p><a href="#top" class="btn btn--accent">Read more</a></p>
        </div>
        <figure>
          <img src="./img-1.jpg" alt="" />
        </figure>
      </div>
    </li>
    <li class="card" id="card_2">
      <div class="card__content">
        <div>
          <h2>Card Two</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p><a href="#top" class="btn btn--accent">Read more</a></p>
        </div>
        <figure>
          <img src="./img-2.jpg" alt="" />
        </figure>
      </div>
    </li>
    <li class="card" id="card_3">
      <div class="card__content">
        <div>
          <h2>Card Three</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p><a href="#top" class="btn btn--accent">Read more</a></p>
        </div>
        <figure>
          <img src="./img-3.jpg" alt="" />
        </figure>
      </div>
    </li>
    <li class="card" id="card_4">
      <div class="card__content">
        <div>
          <h2>Card Four</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p><a href="#top" class="btn btn--accent">Read more</a></p>
        </div>
        <figure>
          <img src="./img-2.jpg" alt="" />
        </figure>
      </div>
    </li>
  </ul>
</main>
<aside>
  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem repellat non
    ratione eum provident quaerat obcaecati dicta autem voluptates sit cum quis
    distinctio, atque sint commodi reprehenderit perspiciatis iure velit
    molestiae eos molestias ipsa nihil quia? Porro tempore in fugit, aspernatur
    et temporibus aliquam magnam adipisci deleniti dicta repellat alias nostrum
    impedit quidem odit excepturi nam. Itaque numquam unde quae dignissimos
    exercitationem placeat, ipsa amet tempora vitae ullam animi! Hic asperiores
    in esse atque expedita dolorem officia illo commodi fugit earum ab,
    assumenda optio, sed repellat. Maiores laudantium reprehenderit suscipit
    accusamus assumenda, debitis nemo ut sapiente numquam doloremque alias
    explicabo minus autem harum illum dicta. Unde obcaecati inventore repellat
    id eligendi eaque, rerum aliquam maiores aspernatur cumque tenetur quo qui
    mollitia atque quasi voluptate ipsum neque explicabo voluptatem quibusdam
    beatae quae iste vero doloribus! Natus libero quibusdam molestias harum
    atque, assumenda doloribus quis, quam corporis, voluptas suscipit magni!
    Enim sapiente totam consequatur repellat maxime placeat perferendis iste
    maiores soluta, obcaecati incidunt expedita eius cumque ipsa quo sed. Minus
    distinctio culpa cumque labore nulla laborum ex, explicabo magni mollitia
    eaque aliquam vero blanditiis quae, id necessitatibus error voluptas harum
    tempora sint porro. Facilis beatae quasi soluta et ipsum suscipit
    repellendus inventore.
  </p>

  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, ipsam
    molestias. Fuga similique, dolor tempora rerum perferendis ipsam ullam
    doloribus beatae esse facilis quae sit excepturi expedita non, sunt
    accusantium magnam? Animi nesciunt nostrum eligendi iusto voluptatum hic
    qui. Quod distinctio qui nobis et doloremque. Fuga, itaque? Laborum
    dignissimos nobis quaerat optio voluptatum similique unde, neque cupiditate,
    vel, fugiat dolore? Accusantium neque deserunt ducimus enim, illum laborum
    magni ipsam eos optio aspernatur nam necessitatibus quod natus, dolor
    laboriosam illo velit.
  </p>
  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem repellat non
    ratione eum provident quaerat obcaecati dicta autem voluptates sit cum quis
    distinctio, atque sint commodi reprehenderit perspiciatis iure velit
    molestiae eos molestias ipsa nihil quia? Porro tempore in fugit, aspernatur
    et temporibus aliquam magnam adipisci deleniti dicta repellat alias nostrum
    impedit quidem odit excepturi nam. Itaque numquam unde quae dignissimos
    exercitationem placeat, ipsa amet tempora vitae ullam animi! Hic asperiores
    in esse atque expedita dolorem officia illo commodi fugit earum ab,
    assumenda optio, sed repellat. Maiores laudantium reprehenderit suscipit
    accusamus assumenda, debitis nemo ut sapiente numquam doloremque alias
    explicabo minus autem harum illum dicta. Unde obcaecati inventore repellat
    id eligendi eaque, rerum aliquam maiores aspernatur cumque tenetur quo qui
    mollitia atque quasi voluptate ipsum neque explicabo voluptatem quibusdam
    beatae quae iste vero doloribus! Natus libero quibusdam molestias harum
    atque, assumenda doloribus quis, quam corporis, voluptas suscipit magni!
    Enim sapiente totam consequatur repellat maxime placeat perferendis iste
    maiores soluta, obcaecati incidunt expedita eius cumque ipsa quo sed. Minus
    distinctio culpa cumque labore nulla laborum ex, explicabo magni mollitia
    eaque aliquam vero blanditiis quae, id necessitatibus error voluptas harum
    tempora sint porro. Facilis beatae quasi soluta et ipsum suscipit
    repellendus inventore.
  </p>

  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, ipsam
    molestias. Fuga similique, dolor tempora rerum perferendis ipsam ullam
    doloribus beatae esse facilis quae sit excepturi expedita non, sunt
    accusantium magnam? Animi nesciunt nostrum eligendi iusto voluptatum hic
    qui. Quod distinctio qui nobis et doloremque. Fuga, itaque? Laborum
    dignissimos nobis quaerat optio voluptatum similique unde, neque cupiditate,
    vel, fugiat dolore? Accusantium neque deserunt ducimus enim, illum laborum
    magni ipsam eos optio aspernatur nam necessitatibus quod natus, dolor
    laboriosam illo velit.
  </p>
  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem repellat non
    ratione eum provident quaerat obcaecati dicta autem voluptates sit cum quis
    distinctio, atque sint commodi reprehenderit perspiciatis iure velit
    molestiae eos molestias ipsa nihil quia? Porro tempore in fugit, aspernatur
    et temporibus aliquam magnam adipisci deleniti dicta repellat alias nostrum
    impedit quidem odit excepturi nam. Itaque numquam unde quae dignissimos
    exercitationem placeat, ipsa amet tempora vitae ullam animi! Hic asperiores
    in esse atque expedita dolorem officia illo commodi fugit earum ab,
    assumenda optio, sed repellat. Maiores laudantium reprehenderit suscipit
    accusamus assumenda, debitis nemo ut sapiente numquam doloremque alias
    explicabo minus autem harum illum dicta. Unde obcaecati inventore repellat
    id eligendi eaque, rerum aliquam maiores aspernatur cumque tenetur quo qui
    mollitia atque quasi voluptate ipsum neque explicabo voluptatem quibusdam
    beatae quae iste vero doloribus! Natus libero quibusdam molestias harum
    atque, assumenda doloribus quis, quam corporis, voluptas suscipit magni!
    Enim sapiente totam consequatur repellat maxime placeat perferendis iste
    maiores soluta, obcaecati incidunt expedita eius cumque ipsa quo sed. Minus
    distinctio culpa cumque labore nulla laborum ex, explicabo magni mollitia
    eaque aliquam vero blanditiis quae, id necessitatibus error voluptas harum
    tempora sint porro. Facilis beatae quasi soluta et ipsum suscipit
    repellendus inventore.
  </p>

  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, ipsam
    molestias. Fuga similique, dolor tempora rerum perferendis ipsam ullam
    doloribus beatae esse facilis quae sit excepturi expedita non, sunt
    accusantium magnam? Animi nesciunt nostrum eligendi iusto voluptatum hic
    qui. Quod distinctio qui nobis et doloremque. Fuga, itaque? Laborum
    dignissimos nobis quaerat optio voluptatum similique unde, neque cupiditate,
    vel, fugiat dolore? Accusantium neque deserunt ducimus enim, illum laborum
    magni ipsam eos optio aspernatur nam necessitatibus quod natus, dolor
    laboriosam illo velit.
  </p>
</aside>

<style>
  :root {
    --card-height: 40vw;
    --card-margin: 4vw;
    --card-top-offset: 1em;
    --outline-width: 0px;
  }

  #cards {
    /* Make place at bottom, as items will slide to that position*/
    padding-bottom: calc(var(--numcards) * var(--card-top-offset));
    /* Don't include the --card-margin in padding, as that will affect the scroll-timeline*/
    margin-bottom: var(--card-margin);
  }

  #card_1 {
    --index: 1;
  }

  #card_2 {
    --index: 2;
  }

  #card_3 {
    --index: 3;
  }

  #card_4 {
    --index: 4;
  }

  .card {
    position: sticky;
    top: 0;
    padding-top: calc(var(--index) * var(--card-top-offset));
  }

  .card__content {
    transform-origin: 50% 0%;
    will-change: transform;
  }

  body {
    background: rgb(58 29 43);
    color: rgb(255, 255, 255);

    font-size: calc(1em + 0.5vw);
  }

  header,
  main {
    width: 80vw;
    margin: 0 auto;
    text-align: center;
  }

  header {
    height: 100vh;
    display: grid;
    place-items: center;
  }

  #cards {
    list-style: none;
    outline: calc(var(--outline-width) * 10) solid hotpink;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(var(--numcards), var(--card-height));
    gap: var(--card-margin);
  }

  .card {
    outline: var(--outline-width) solid lime;
  }

  .card__content {
    box-shadow:
      0 0.2em 1em rgba(0, 0, 0, 0.1),
      0 1em 2em rgba(0, 0, 0, 0.1);
    background: rgb(255, 255, 255);
    color: rgb(10, 5, 7);
    border-radius: 1em;
    overflow: hidden;

    display: grid;
    grid-template-areas: "text img";
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;

    align-items: stretch;
    outline: var(--outline-width) solid blue;
  }

  .card__content > div {
    grid-area: text;
    width: 80%;
    place-self: center;
    text-align: left;

    display: grid;
    gap: 1em;
    place-items: start;
  }

  .card__content > figure {
    grid-area: img;
    overflow: hidden;
  }

  .card__content > figure > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  main h1 {
    font-weight: 300;
    font-size: 3.5em;
  }

  main h2 {
    font-weight: 300;
    font-size: 2.5em;
  }

  main p {
    font-family: sans-serif;
    font-weight: 300;
    line-height: 1.42;
  }

  main .btn {
    background: rgb(188 87 36);
    color: rgb(255 255 255);
    text-decoration: none;
    display: inline-block;
    padding: 0.5em;
    border-radius: 0.25em;
  }

  aside {
    width: 50vw;
    margin: 0 auto;
    text-align: left;
  }

  aside p {
    margin-bottom: 1em;
  }

  /* Position warning box */
  .warning {
    background-color: var(--sand-5);
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    width: max-content;
    text-align: center;
    max-width: 90vw;
    margin: auto;
    z-index: 2;
    font-size: 0.8em;
    color: #fff;
  }
</style>
