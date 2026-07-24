<script lang="ts">
    let { data } = $props();

    import {
        BookOpen,
        User,
        BookMarked,
        Map,
        Search,
        ArrowRight,
        Quote,
    } from "lucide-svelte";
    import { resolve } from '$app/paths';

    const features = $derived([
        {
            // icon: User,
            total: data.autores,
            title: "Autores",
            desc: "Escritores de língua alemã lidos no Brasil oitocentista.",
        },
        {
            // icon: BookMarked,
            total: data.obras,
            title: "Obras",
            desc: "Obras de língua alemã que circularam no Brasil oitocentista.",
        },
        {
            // icon: Map,
            total: data.fontes,
            title: "Fontes",
            desc: "Catálogos de livreiros, periódicos e catálogos de biblioteca.",
        },
        {
            // icon: BarChart3,
            total: data.cidades,
            title: "Cidades",
            desc: "Locais de publicação de obras originais e traduzidas.",
        },
    ]);
</script>

<svelte:head>
    <title>Literatura de Língua Alemã no Brasil, Oitocentista</title>
</svelte:head>

<!-- ===================== HERO ===================== -->
<section class="relative overflow-hidden bg-beige w-full">
  <div class="mx-auto max-w-7xl px-6 py-16 lg:py-24">
    <div class="grid items-center gap-12 lg:grid-cols-2">
      <!-- Text -->
      <div class="relative z-10">
        <h1
          class="font-serif text-4xl font-bold leading-tight text-brown-dark md:text-5xl lg:text-6xl"
        >
          Literatura de língua alemã no Brasil do século XIX
        </h1>
        <p class="mt-6 max-w-md text-lg leading-relaxed text-brown-mid">
          Mapeando a circulação, traduções e recepção de romances entre Europa e
          Brasil.
        </p>
        <a
          href={resolve("/obras")}
          class="mt-8 inline-flex items-center gap-2 border border-brown-dark px-6 py-3 text-sm font-medium text-brown-dark transition-all hover:bg-brown-dark hover:text-cream"
        >
          Explorar a coleção
          <ArrowRight class="h-4 w-4" />
        </a>
      </div>

      <!-- Newspaper Image -->
      <!-- <div class="relative hidden lg:block">
        <div
          class="relative mx-auto w-[380px] rotate-8 bg-beige p-0 shadow-xl object-cover"
        >
        
        </div>
      </div> -->
    </div>
  </div>
  <img 
    alt="Capa do periódico Novo Correio de Modas." 
    src={resolve("/novo-correio-de-modas-capa-o-flibusteiro.jpg")}
    class="pointer-events-none absolute right-8 top-1/2 w-95 -translate-y-1/2 rotate-10 opacity-20 shadow-2xl lg:w-112.5 lg:opacity-90"
  />
</section>

<!-- ===================== FEATURES ===================== -->
<section class="border-y border-beige bg-cream w-full">
  <div class="mx-auto max-w-7xl px-6 py-12">
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-brown-mid/20">
      {#each features as feature}
        <div class="group text-center px-4">
          <div
            class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-beige/60 transition-colors group-hover:bg-brown-warm/20"
          >
            <!-- <svelte:component
              this={feature.icon}
              class="h-6 w-6 text-brown-dark"
              stroke-width={1.5}
            /> -->
            <span class="font-bold text-lg">{feature.total}</span>
          </div>
          <h3 class="font-serif text-lg font-semibold text-brown-dark">
            {feature.title}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-brown-mid">
            {feature.desc}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ===================== QUOTE ===================== -->
<section class="relative overflow-hidden bg-beige/40 w-full">
  <div class="mx-auto max-w-7xl px-6 py-20 lg:py-28">
    <div class="relative z-10 mx-auto max-w-3xl text-center h-52">
      <!-- <Quote class="mx-auto mb-6 h-8 w-8 text-brown-warm/50" stroke-width={1} />
      <blockquote
        class="font-serif text-2xl font-medium leading-relaxed text-brown-dark md:text-3xl lg:text-3xl"
      >
        "As leituras que circulavam no Brasil oitocentista revelam uma história
        transatlântica da literatura."
      </blockquote>
      <a
        href={resolve("/sobre-o-projeto")}
        class="mt-10 inline-flex underline items-center gap-2 text-md font-medium text-brown-mid transition-colors hover:text-brown-dark"
      >
        Sobre o projeto
        <ArrowRight class="h-4 w-4" />
      </a> -->
    </div>

    <!-- 
    Fonte: https://bndigital.bn.gov.br/exposicoes/historica-cartographica-brasilis-in-biblioteca-nacional/brasil-seculo-xix/
    RAPKIN, J. Brazil. London; New York: John Tallis & Company; [ca.1851]. Litografado, aquarelado.  
    Esse mapa, desenhado e gravado por Rapkin, traz vinhetas de vistas de cidades decoradas por Winkles e gravadas por Lacey. 
    Faz parte da obra Illustrated atlas and modern history, publicada por John Tallis. 
    Como todos os mapas desse atlas, caracteriza-se pelas belas ilustrações. 
    O Brasil está representado com as divisões administrativas, além de constarem o Paraguai e o Uruguai. 
    http://objdigital.bn.br/objdigital2/acervo_digital/div_cartografia/cart354238/cart354238.html
    -->
    <img 
      alt="RAPKIN, J. Brazil. London; New York: John Tallis & Company; [ca.1851]. Litografado, aquarelado.  
    Esse mapa, desenhado e gravado por Rapkin, traz vinhetas de vistas de cidades decoradas por Winkles e gravadas por Lacey. 
    Faz parte da obra Illustrated atlas and modern history, publicada por John Tallis. 
    Como todos os mapas desse atlas, caracteriza-se pelas belas ilustrações. 
    O Brasil está representado com as divisões administrativas, além de constarem o Paraguai e o Uruguai. " 
      src={resolve("mapa-brasil-footer.png")}
      class="absolute top-0 left-0 right-0 w-full opacity-20"
    />
  </div>
</section>