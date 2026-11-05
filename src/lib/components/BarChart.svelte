<script lang="ts">
  import { onMount } from 'svelte';
  import type { ChartDatum } from '$lib/utils/types';

  let {
    data = [],
    title = '',
    color = '#8B5A2B', // Brown-warm placeholder
    height = '320px'
  }: {
    data: ChartDatum[];
    title?: string;
    color?: string;
    height?: string;
  } = $props();

  let el: HTMLDivElement;
  let chart: any = $state(undefined);

  const buildOption = (items: ChartDatum[]) => ({
    title: title ? {
      text: title,
      left: 'center',
      textStyle: { fontSize: 14, fontWeight: 600, color: '#4A3B32' } // brown-dark approx
    } : undefined,
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: 8, right: 16, top: title ? 48 : 20, bottom: 24, containLabel: true },
    xAxis: {
      type: 'category',
      data: items.map((d) => d.name),
      axisLabel: { hideOverlap: true, rotate: items.length > 15 ? 45 : 0, color: '#6B5B4F' }
    },
    yAxis: { type: 'value', minInterval: 1, axisLabel: { color: '#6B5B4F' } },
    series: [{
      type: 'bar',
      data: items.map((d) => d.value),
      itemStyle: { borderRadius: [4, 4, 0, 0], color },
      barMaxWidth: 32
    }]
  });

  onMount(() => {
    let cancelled = false;
    let resizeObserver: ResizeObserver | undefined;

    async function setup() {
      const [core, charts, components, renderers] = await Promise.all([
        import('echarts/core'),
        import('echarts/charts'),
        import('echarts/components'),
        import('echarts/renderers')
      ]);

      core.use([
        charts.BarChart,
        components.GridComponent,
        components.TooltipComponent,
        components.TitleComponent,
        renderers.CanvasRenderer
      ]);

      if (cancelled || !el) return;

      chart = core.init(el);
      chart.setOption(buildOption(data));

      resizeObserver = new ResizeObserver(() => chart?.resize());
      resizeObserver.observe(el);
    }

    setup();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      chart?.dispose();
      chart = undefined;
    };
  });

  $effect(() => {
    if (chart) chart.setOption(buildOption(data), { lazyUpdate: true });
  });
</script>

<div
  bind:this={el}
  role="img"
  aria-label={title || 'Gráfico de barras'}
  style="width: 100%; height: {height};"
></div>