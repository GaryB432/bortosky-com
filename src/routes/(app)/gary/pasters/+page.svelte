<script lang="ts">
  import ClipboardCopy from "$lib/components/ClipboardCopy.svelte";
  import { rand } from "$lib/shared/prng";
  import { onMount } from "svelte";

  // prettier-ignore
  const strings = [
    "]kKnsu5s@T*y", "Kn34g3rb!FE3", "MB-Fr?J(ugI<", "EjcRCELmbB2*",
    "f<uYPCB4)o)Z", "HVaSEK6%X9&y", "VJ%Xi6^kin^O", "Rc(naT77xY@(",
    "Rwz22&TTOwL*", "%CS*s)kXqZ(p", "uo@Fi)r&tXrD", "Y#7%[&2I<DHb",
    "8DzEWMWHqGAR", "B*bA&OjjEV3<", "EXce>%w]w4b1", "+puK4Is)(k<K",
    "M6s*CTQ*l!Ba", "QkzE!Y$i([bE", "&<N\\NY6!3wN=", "NEW[4L^Mn7oJ",
    "Y>y*xzEk1e[G", "$7[%9eWR*2H>", "vCfR)MCUrE1x", "+6C@x+v8nMrs",
    "]OGSXzEHJ$&]", "(<+NtT([6r1D", "V&%snZc)jqz5", "RVOU8pBatYTZ",
    "&NG3gv0SCu>O", "y7vJA!gO]K>U", "P^q%tEu[EkHo", "G<Ct!7fpSWJz",
    "5C)y6F]P6<w$", "cpnbl!iUjwqB", "xAWP[+y^@5^E", "q9amF&h&gWQ)",
    "dDZY(OzpgQZu", "25AlYTG0HP>A", "6su4@V]40z@T", "5)mCnRmPn+#S",
    "AaEAr@^l$C1U", "UKUrK)%GpkL>", "m3q1Fu4lW6K3", "39*4P+xO6HQ)",
    "HsSThk*iG+LG", "[Ev@FzbD1V)#", "r4u1RvDYK72X", "CQKTsEb92f*y",
    "4m@B^fV3Lrfm", "97v$A)]VM8yG", "fYUf>+57)Eq(", "zDR5RhI2ctoM",
    "c+YC0jGhvVm&", "vuphzA2!p*ND", "P0lr5&r>Ne0i", "@>sKpQ[sZox2",
    "OC1y9e^Eamk6", "^sEs*QIdz%+8", "$%cHV^znVP&f", "MiDyfF^PnV*V",
    "kbnBG7d4Fw)7", "qvOd[sY<rReG", "#Nj0<Okxx*Zw", "+@)<ECIBTe6#",
    ];

  let active = $state<string[]>([]);

  function pluckRandomStrings(count = 4): string[] {
    return Array(count)
      .fill(0)
      .map(() => strings[Math.floor(rand() * strings.length)]);
  }

  onMount(() => {
    active = pluckRandomStrings();
  });
</script>

<svelte:head>
  <title>bortosky.com - pasters</title>
</svelte:head>

<h2>Pick and paste as needed <i>IYKYK 😏</i></h2>
<button
  class="button-a"
  onclick={() => {
    active = pluckRandomStrings();
  }}>SPIN</button
>
<section class="container">
  {#each strings as str}
    <div class:active={active.includes(str)}>
      <div class="p">
        {str}
      </div>
      <div>
        <ClipboardCopy
          width="3em"
          textToCopy={str}
          oncopied={(detail: string) => console.log(detail)}
        />
      </div>
    </div>
  {/each}
</section>

<style lang="scss">
  .container {
    padding: 1em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    > div {
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .p {
        padding: 0.5rem;
        width: 15ch;
      }
      &.active .p {
        // background: radial-gradient(
        //   ellipse at center,
        //   #f73134 0%,
        //   #ff0000 47%,
        //   #ff0000 47%,
        //   #23bc2b 47%,
        //   #23bc2b 48%
        // );
        background-color: rgb(var(--fun-blue));

        color: white;

        &::before {
          content: "";
        }
      }
    }
  }
  i {
    font-size: 0.5em;
  }

  @media screen and (min-width: 576px) {
    /* landscape phones */
  }
  @media screen and (min-width: 768px) {
    /* tablets */
  }
  @media screen and (min-width: 992px) {
    .container {
      grid-template-columns: repeat(4, 1fr);
    }
    /* desktops */
  }
  @media screen and (min-width: 1200px) {
    /* large desktops */
  }
  @media screen and (min-width: 1400px) {
    /* larger desktops */
  }
</style>
