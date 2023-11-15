<script lang="ts">
  import ClipboardCopy from "$lib/components/ClipboardCopy.svelte";

  // prettier-ignore
  const strings = [
    "]kKnsu5s@T*y", "Kn34g3rb!FE3", "B*bA&OjjEV3<", "EjcRCELmbB2*",
    "f<uYPCB4)o)Z", "HVaSEK6%X9&y", "VJ%Xi6^kin^O", "Rc(naT77xY@(",
    "97v$A)]VM8yG", "%CS*s)kXqZ(p", "uo@Fi)r&tXrD", "Y#7%[&2I<DHb",
    "8DzEWMWHqGAR", "MB-Fr?J(ugI<", "EXce>%w]w4b1", "+puK4Is)(k<K",
    "M6s*CTQ*l!Ba", "&<N\\NY6!3wN=", "QkzE!Y$i([bE", "NEW[4L^Mn7oJ",
    "Y>y*xzEk1e[G", "$7[%9eWR*2H>", "vCfR)MCUrE1x", "6su4@V]40z@T",
    "]OGSXzEHJ$&]", "(<+NtT([6r1D", "V&%snZc)jqz5", "RVOU8pBatYTZ",
    "xAWP[+y^@5^E", "y7vJA!gO]K>U", "P^q%tEu[EkHo", "G<Ct!7fpSWJz",
    "5C)y6F]P6<w$", "cpnbl!iUjwqB", "&NG3gv0SCu>O", "q9amF&h&gWQ)",
    "dDZY(OzpgQZu", "@>sKpQ[sZox2", "+6C@x+v8nMrs", "5)mCnRmPn+#S",
    "UKUrK)%GpkL>", "AaEAr@^l$C1U", "m3q1Fu4lW6K3", "39*4P+xO6HQ)",
    "HsSThk*iG+LG", "[Ev@FzbD1V)#", "r4u1RvDYK72X", "CQKTsEb92f*y",
    "4m@B^fV3Lrfm", "Rwz22&TTOwL*", "fYUf>+57)Eq(", "zDR5RhI2ctoM",
    "c+YC0jGhvVm&", "vuphzA2!p*ND", "P0lr5&r>Ne0i", "25AlYTG0HP>A",
    "OC1y9e^Eamk6", "^sEs*QIdz%+8", "$%cHV^znVP&f", "MiDyfF^PnV*V",
    "kbnBG7d4Fw)7", "qvOd[sY<rReG", "#Nj0<Okxx*Zw", "+@)<ECIBTe6#",
    ];
</script>

<svelte:head>
  <title>bortosky.com - pasters</title>
</svelte:head>

<h2>Pick and paste as needed 😏</h2>
<section class="container">
  {#each strings as str}
    <div>
      <div class="p">
        <code>
          {str}
        </code>
      </div>
      <div>
        <ClipboardCopy
          width={"2em"}
          textToCopy={str}
          on:copied={(e) => console.log(e.detail)}
        />
      </div>
    </div>
  {/each}
</section>

<style lang="scss">
  .container {
    padding: 1em;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    > div {
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .p {
        width: 15ch;
      }
    }
  }
</style>
