<script context="module" lang="ts">
  import Crumbs from '$lib/Crumbs.svelte';
  import Footer from '$lib/Footer.svelte';
  import data from './theater.json';

  type ISODate = string;

  interface Production {
    opening: ISODate;
    producer: Producer;
    role: string;
    show: string;
  }

  interface Producer {
    name: string;
    productions: Production[];
  }

  const dprods = data as { producers: Producer[] };

  const prods = dprods.producers
    .map((producer) => {
      producer.productions.forEach((production) => (production.producer = producer));
      return producer.productions;
    })
    .flat(1)
    .map((s) => {
      const dd = new Date(s.opening);
      return {
        ...s,
        openDate: new Date(s.opening),
      };
    })
    .sort((a, b) => b.opening.localeCompare(a.opening));
</script>

<svelte:head>
  <title>Theater</title>
  <meta name="description" content="Gary Theater" />
</svelte:head>

<div class="bort-container mdl-grid">
  <div class="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone" />
  <div
    class="bort-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col"
  >
    <Crumbs />
    <div class="theater">
      <h2>Theater Resumé</h2>
      <table class="shows">
        <thead>
          <tr>
            <th>Show</th>
            <th>Opening</th>
            <th>Company</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {#each prods as prod}
            <tr>
              <td>{prod.show}</td>
              <td>
                <div title={prod.openDate.toLocaleString()}>
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'long',
                    year: 'numeric',
                  }).format(prod.openDate)}
                </div>
              </td>
              <td>{prod.producer.name}</td>
              <td>{prod.role}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<Footer />

<style lang="scss">
  div {
    .theater {
      margin: 10px;
      h2 {
        font-size: 120%;
        font-weight: 700;
        margin-bottom: 6px;
      }
    }
  }

  table {
    &.shows {
      border-spacing: 0;
      border-collapse: collapse;
      font-size: 80%;
      td,
      th {
        padding: 6px;
        text-align: left;
        border: thin solid silver;
      }
    }
  }
</style>
