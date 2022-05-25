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
  const ffg = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: '2-digit',
  });
  export let monthIso: string;
  $: if (monthIso.length !== 7) {
    throw new Error('nope');
  }
  $: day1 = new Date(Number(monthIso.slice(0, 4)), Number(monthIso.slice(5, 7)) - 1, 1);
  $: sunday0 = addDays(day1, -day1.getDay());
</script>

<div class="m">
  <header>
    {ffg.format(day1)}
  </header>
  {#each Array(5)
    .fill(0)
    .map((_, n) => addDays(sunday0, n * 7)) as week}
    <div class="w">
      {#each Array(7)
        .fill(0)
        .map((_, n) => addDays(week, n)) as day}
        <div class="day" class:current-month={day.getMonth() === day1.getMonth()}>
          {day.getDate()}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .m {
    border: thin solid silver;
    header {
      font-weight: bold;
      text-align: center;
    }
  }
  .w {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  .day {
    border: thin solid silver;
    padding: 0 1em 1em 0;
    background: #cccc;
    &.current-month {
      background: white;
    }
  }
</style>
