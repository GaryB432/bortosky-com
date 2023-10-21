<script lang="ts">
  // export let subject = 'AddToCollectionButton component';
</script>

<div class="container">
  <label class="collection">
    <input type="checkbox" />
    <div>
      <span />
    </div>
  </label>
</div>

<style lang="scss">
  .container {
    border: thin solid silver;
  }
  $border: #212533;

  .collection {
    input {
      display: none;
      & + div {
        position: relative;
        width: 24px;
        height: 36px;
        border-radius: 3px;
        border: 2px solid $border;
        margin: 0 0 0 8px;
        cursor: pointer;
        transition: all 0.4s ease;
        &:before,
        &:after {
          content: "";
          display: block;
          position: absolute;
          width: 2px;
          border-radius: 2px;
          background: $border;
          right: 100%;
          transition: all 0.4s ease, background 0.2s ease;
        }
        &:before {
          transform: translate(-4px, 0);
          top: 4px;
          bottom: 4px;
        }
        &:after {
          transform: translate(-8px, 0);
          top: 8px;
          bottom: 8px;
        }
        span {
          display: block;
          left: 50%;
          top: 50%;
          position: absolute;
          transition: transform 0.4s ease;
          &:before,
          &:after {
            content: "";
            display: block;
            position: absolute;
            border-radius: 2px;
            background: $border;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: background 0.2s ease;
          }
          &:before {
            width: 10px;
            height: 2px;
          }
          &:after {
            height: 10px;
            width: 2px;
          }
        }
      }
      &:checked + div {
        height: 24px;
        margin: 6px 4px;
        background: $border;
        &:before,
        &:after {
          transform: translate(2px, 0);
          opacity: 0;
        }
        span {
          transform: rotate(-225deg);
          &:before,
          &:after {
            background: #fff;
          }
        }
      }
    }
  }

  // Center & dribbble
  // body {
  //   min-height: 100vh;
  //   // font-family: Roboto, Arial;
  //   color: #adafb6;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   .dribbble {
  //     position: fixed;
  //     display: block;
  //     right: 20px;
  //     bottom: 20px;
  //     opacity: 0.5;
  //     transition: all 0.4s ease;
  //     &:hover {
  //       opacity: 1;
  //     }
  //     img {
  //       display: block;
  //       height: 36px;
  //     }
  //   }
  // }
</style>
