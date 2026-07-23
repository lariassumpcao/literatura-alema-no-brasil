<script lang="ts">
  import type { ComponentProps } from "svelte";
  import { Slider } from "bits-ui";
 
  type Props = WithoutChildren<ComponentProps<typeof Slider.Root>>;
 
  let {
    value = $bindable(),
    ref = $bindable(null),
    ...restProps
  }: Props = $props();
</script>
 
<!--
 Since we have to destructure the `value` to make it `$bindable`, we need to use `as any` here to avoid
 type errors from the discriminated union of `"single" | "multiple"`.
 (an unfortunate consequence of having to destructure bindable values)
  -->
<Slider.Root class="relative flex w-full touch-none select-none items-center" bind:value bind:ref {...restProps as any}>
  {#snippet children({ thumbs, ticks })}
    <span
      class="bg-dark-10 relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full"
    >
      <Slider.Range class="bg-foreground absolute h-full"/>
    </span>
    {#each thumbs as index}
      <Slider.Thumb {index} class="border-border-input bg-background hover:border-dark-40 focus-visible:ring-foreground dark:bg-foreground dark:shadow-card data-active:border-dark-40 focus-visible:outline-hidden data-active:scale-[0.98] block size-[25px] cursor-pointer rounded-full border shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"/>
    {/each}
 
    {#each ticks as index}
      <Slider.Tick {index} />
    {/each}
  {/snippet}
</Slider.Root>