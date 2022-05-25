<script lang="ts">
  const monthNames = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  function addDays(subject: Date, addend: number): Date {
    return new Date(subject.valueOf() + addend * 24 * 60 * 60 * 1000);
  }
  // let weeks: Date[];
  export let monthIso: string;
  $: if (monthIso.length !== 7) {
    throw new Error('nope');
  }
  $: day1 = new Date(Number(monthIso.slice(0, 4)), Number(monthIso.slice(5, 7)) - 1, 1);
  $: sunday0 = addDays(day1, -day1.getDay());
</script>

<div>
  <p>
    {day1}
  </p>
  <div class="m">
    {#each Array(5)
      .fill(0)
      .map((_, n) => addDays(sunday0, n * 7)) as week}
      <div class="w">
        {#each Array(7)
          .fill(0)
          .map((_, n) => addDays(week, n)) as day}
          <div class="day">
            {day.getDate()}
          </div>
        {/each}
      </div>
    {/each}
  </div>
  <p>
    {sunday0}
  </p>
</div>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  .m {
    // display: flex;
    // border: thin solid orange;
    // flex-direction: column;
    border: thin solid silver;
  }
  .w {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    align-items: flex-end;
  }
  .day {
    // display: flex;
    border: thin solid silver;
    // text-align: right;
    padding: 0 1em 1em 0;
  }
</style>
