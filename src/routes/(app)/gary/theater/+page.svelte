<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  const shortDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  });
  const longerDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  });
</script>

<h1>Gary's Theater Resume</h1>
<table>
  <thead>
    <tr>
      <th>Show</th>
      <th>Opening</th>
      <th>Role</th>
      <th>Producer</th>
    </tr>
  </thead>
  <tbody>
    {#each data.productions as production}
      {@const opening = new Date(production.opening)}
      <tr>
        <td>
          {production.show}
        </td>
        <td title={longerDate.format(opening)}>
          {shortDate.format(opening)}
        </td>
        <td>{production.role}</td>
        <td>{production.producer.name}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  th,
  td {
    padding: 0.2rem;
  }
  th {
    font-weight: 600;
  }
  td:nth-child(1) {
    background: orange;
  }
  @media screen and (min-width: 576px) {
    /* landscape phones */
  }
  @media screen and (min-width: 768px) {
    /* tablets */
  }
  @media screen and (min-width: 992px) {
    /* desktops */
    td:nth-child(1) {
      background: unset;
    }
    table {
      margin: 0 auto;
      max-width: 90vw;
    }
  }
  @media screen and (min-width: 1200px) {
    /* large desktops */
  }
  @media screen and (min-width: 1400px) {
    /* larger desktops */
  }
</style>
