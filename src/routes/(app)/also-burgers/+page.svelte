<script lang="ts">
  let opened = $state(false);
</script>

<svelte:head>
  <title>bortosky-com - also-burgers</title>
</svelte:head>

<header>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="hamburger-icon"
    id="icon"
    onclick={() => {
      opened = !opened;
    }}
  >
    <div class="icon-1" id="a" class:a={opened}></div>
    <div class="icon-2" id="b" class:c={opened}></div>
    <div class="icon-3" id="c" class:b={opened}></div>
    <div class="clear"></div>
  </div>

  <nav id="nav" class:show={opened}>
    <ul>
      <li>HOme</li>
      <li>About</li>
      <li>Contact</li>
      <li>Help</li>
    </ul>
  </nav>

  <div class="dark-blue" id="blue" class:slide={opened}></div>

  <section class="content">
    <h1>Hello We are animated!</h1>
    <p class="small">Lorem ipsum dolor sit amet</p>
    <p class="small">{opened}</p>
  </section>
</header>

<style lang="scss">
  // @import url(https://fonts.googleapis.com/css?family=Montserrat:400,700);

  header {
    width: 100%;
    height: 100%;
    background: #e74c3c;
    position: absolute;
    overflow: auto;
  }

  .icon-1,
  .icon-2,
  .icon-3 {
    position: absolute;
    left: 25%;
    top: 50%;
    width: 32px;
    height: 3px;
    background-color: black;
    transition: all 400ms cubic-bezier(0.84, 0.06, 0.52, 1.8);
  }

  .icon-1 {
    transform: translateY(-8px);
    animation-delay: 100ms;
  }

  .icon-3 {
    transform: translateY(8px);
    animation-delay: 250ms;
  }

  .hamburger-icon {
    position: absolute;
    height: 60px;
    width: 60px;
    top: 10%;
    left: 3%;
    z-index: 1000;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    background: rgba(255, 255, 255, 0.2);
    // background: green;
    // width: auto;
    // height: 50px;
    // overflow: hidden;
    &:hover {
      // .icon-1 {
      //   transform: rotate(40deg);
      // }
      // .icon-3 {
      //   transform: rotate(-40deg);
      // }
      // .icon-2 {
      //   opacity: 0;
      // }
      transform: scale(1.2);
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
    }
  }

  .icon-1.a {
    transform: rotate(40deg);
  }
  .icon-3.b {
    transform: rotate(-40deg);
  }
  .icon-2.c {
    opacity: 0;
  }

  .clear {
    clear: both;
  }

  @keyframes slideIn {
    0% {
      width: 0%;
      // transform: scale(.3);
      opacity: 0;
    }

    100% {
      width: 50%;
      // transform:scale(1);
      opacity: 1;
    }
  }

  nav {
    background: #0288d1;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0%;
    z-index: 10;
    opacity: 0;

    transition: all 600ms cubic-bezier(0.62, 0.04, 0.3, 1.56);
    transition-delay: 100ms;
    ul {
      margin: 0;
      position: absolute;
      top: 30%;
      left: 40%;
      li {
        list-style: none;
        font-size: 24px;
        color: #fff;
        line-height: 2.2;
        text-transform: uppercase;
        letter-spacing: 1.7px;

        // &:before {
        // }
      }
    }
  }

  nav.show {
    //  opacity: 0;
    // animation: slideIn 0.6s cubic-bezier(.62,.04,.3,1.56);
    // animation-fill-mode: forwards;
    width: 50%;
    // transform:scale(1);
    opacity: 1;
  }

  .dark-blue {
    position: absolute;
    top: 0;
    left: 0;
    background: #64b5f6;
    height: 100%;
    width: 0%;
    transition: all 500ms cubic-bezier(0.62, 0.04, 0.3, 1.8);
    transition-delay: 50ms;
    z-index: 5;
    opacity: 1;
  }

  .dark-blue.slide {
    width: 50%;
    opacity: 1;
  }

  @keyframes shotup {
    0% {
      transform: translateY(300%);
      opacity: 0;
    }
    90% {
      transform: translateY(-50px);
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    text-align: center;
    h1 {
      font-size: 70px;
      animation: shotup 600ms ease-in-out;
      animation-delay: 300ms;
    }
  }
</style>
