<script>
  let name = 'Nigg';
  let beltcolor = 'black'

  const handleClick = () => {
    beltcolor = 'orange'
  }

  const handleInput = (e) => {
    beltcolor = e.target.value;
  }
</script>

<main>
  <h1>Hello {name}</h1>
  <p>{beltcolor} color</p>
  <button on:click={handleClick}>update belt color</button>
  <!-- <input type="text" on:input={handleInput} value={beltcolor}> -->
   <input type="text" bind:value={beltcolor}>
</main>

<style>
  main{
    text-align: center;
    padding: 1rem;
    max-width: 240px;
    margin: 0 auto;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>
