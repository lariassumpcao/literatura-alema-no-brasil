<script lang="ts">
    let { data } = $props(); 
    import { resolve } from '$app/paths';

    import {
        BookOpen,
    } from "lucide-svelte";

    const BookCoverSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" class="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
            <linearGradient id="paper-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F7F4EE" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#6B5E4E" stop-opacity="0.15"/>
            </linearGradient>
        </defs>
        <rect width="100" height="140" fill="#E9E2D5"/>
        <rect width="100" height="140" fill="url(#paper-grad)"/>
        <rect x="6" y="6" width="88" height="128" fill="none" stroke="#6B5E4E" stroke-width="0.8" opacity="0.6"/>
        <rect x="10" y="10" width="80" height="120" fill="none" stroke="#6B5E4E" stroke-width="0.4" opacity="0.4"/>
        <rect x="25" y="22" width="50" height="2" fill="#3E3128" opacity="0.7"/>
        <rect x="30" y="28" width="40" height="2" fill="#3E3128" opacity="0.7"/>
        <rect x="20" y="34" width="60" height="2" fill="#3E3128" opacity="0.7"/>
        <circle cx="50" cy="70" r="12" fill="none" stroke="#A67C52" stroke-width="1" opacity="0.6"/>
        <circle cx="50" cy="70" r="8" fill="none" stroke="#A67C52" stroke-width="0.5" opacity="0.6"/>
        <path d="M50 58 L50 82 M38 70 L62 70" stroke="#A67C52" stroke-width="0.5" opacity="0.6"/>
        <circle cx="50" cy="70" r="2" fill="#A67C52" opacity="0.6"/>
        <rect x="35" y="102" width="30" height="1.5" fill="#3E3128" opacity="0.6"/>
        <rect x="30" y="108" width="40" height="1.5" fill="#3E3128" opacity="0.6"/>
        <rect x="40" y="118" width="20" height="1.5" fill="#3E3128" opacity="0.5"/>
        </svg>
    `;

    const LargeBookCoverSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" class="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
            <linearGradient id="paper-grad-large" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F7F4EE" stop-opacity="0.5"/>
            <stop offset="50%" stop-color="#E9E2D5" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#6B5E4E" stop-opacity="0.2"/>
            </linearGradient>
            <filter id="aged">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.95 0 0 0  0 0.85 0 0 0  0 0 0 0.08 0" in="noise" result="coloredNoise"/>
            <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply"/>
            </filter>
        </defs>
        <rect width="200" height="280" fill="#E9E2D5" filter="url(#aged)"/>
        <rect width="200" height="280" fill="url(#paper-grad-large)"/>
        
        <!-- Outer border -->
        <rect x="12" y="12" width="176" height="256" fill="none" stroke="#3E3128" stroke-width="1.5" opacity="0.5"/>
        <rect x="18" y="18" width="164" height="244" fill="none" stroke="#3E3128" stroke-width="0.5" opacity="0.4"/>
        
        <!-- Simulated title block -->
        <rect x="40" y="40" width="120" height="4" fill="#3E3128" opacity="0.75"/>
        <rect x="50" y="50" width="100" height="3" fill="#3E3128" opacity="0.65"/>
        <rect x="30" y="60" width="140" height="3" fill="#3E3128" opacity="0.7"/>
        <rect x="60" y="70" width="80" height="2" fill="#3E3128" opacity="0.5"/>
        
        <!-- Central ornament -->
        <circle cx="100" cy="140" r="25" fill="none" stroke="#A67C52" stroke-width="1.5" opacity="0.5"/>
        <circle cx="100" cy="140" r="18" fill="none" stroke="#A67C52" stroke-width="0.8" opacity="0.5"/>
        <circle cx="100" cy="140" r="10" fill="none" stroke="#A67C52" stroke-width="0.5" opacity="0.4"/>
        <path d="M100 115 L100 165 M75 140 L125 140" stroke="#A67C52" stroke-width="0.8" opacity="0.5"/>
        <circle cx="100" cy="140" r="3" fill="#A67C52" opacity="0.6"/>
        
        <!-- Simulated author/publisher text -->
        <rect x="70" y="200" width="60" height="2.5" fill="#3E3128" opacity="0.6"/>
        <rect x="55" y="210" width="90" height="2" fill="#3E3128" opacity="0.55"/>
        <rect x="80" y="230" width="40" height="2" fill="#3E3128" opacity="0.5"/>
        
        <!-- Simulated illustration area -->
        <rect x="50" y="85" width="100" height="40" fill="#6B5E4E" opacity="0.08" rx="2"/>
        </svg>
    `;

    const divisor_decorativo_antigo = `
        <svg width="16" height="16" viewBox="0 0 16 16" class="text-brown-warm shrink-0">
        <path d="M8 0 L16 8 L8 16 L0 8 Z" fill="currentColor" opacity="0.6"/>
        <circle cx="8" cy="8" r="2" fill="currentColor"/>
        </svg>
    `
</script>

<svelte:head>
  <title>{data.obra.nome} - Obras</title>
</svelte:head>

<!-- Breadcrumb -->
<nav class="relative w-full bg-cream border-b border-beige">
  <div class="mx-auto max-w-7xl px-6 py-3">
    <ol class="flex items-center gap-2 text-sm text-brown-mid">
      <li><a href={resolve("/")} class="hover:text-brown-dark transition-colors">Início</a></li>
      <li><span class="text-brown-mid">/</span></li>
      <li><a href={resolve("/obras")} class="hover:text-brown-dark transition-colors">Obras</a></li>
      <li><span class="text-brown-mid">/</span></li>
      <li class="text-brown-dark font-medium">{data.obra.nome}</li>
    </ol>
  </div>
</nav>

<!-- Header -->
<header class="relative bg-cream overflow-hidden w-full">
  <!-- Background map/manuscript image with gradient mask -->
  <div
    class="absolute inset-0 bg-[url('/obras-header.png')] bg-cover bg-center"
    style="
      mask-image: linear-gradient(160deg, transparent 0%, transparent 30%, black 80%);
      -webkit-mask-image: linear-gradient(160deg, transparent 0%, transparent 30%, black 80%);
      opacity: 0.75;
    "
  ></div>

  <!-- Subtle overlay for text readability -->
  <div class="absolute inset-0 bg-cream/70 pointer-events-none"></div>

  <div class="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:py-16">
    <div class="max-w-3xl">
      <h1 class="font-serif text-5xl md:text-6xl font-bold text-brown-dark leading-tight">
        {data.obra.nome}
        <!-- <span class="font-normal text-2xl md:text-3xl text-brown-mid ml-3">
          ({book.subtitle})
        </span> -->
      </h1>
      <p class="font-serif text-xl md:text-2xl text-brown-mid mt-3">
        {data.autor?.nome} <b>{data.autor?.sobrenome}</b>
        <span class="text-brown-mid/70"> ({data.autor?.nascimento} - {data.autor?.morte})</span>
      </p>

      <!-- Decorative Divider -->
      <div class="flex items-center gap-4 my-6 max-w-xs">
        <div class="h-px flex-1 bg-brown-mid/40"></div>
        {@html divisor_decorativo_antigo}
        <div class="h-px flex-1 bg-brown-mid/40"></div>
      </div>
    </div>
  </div>
</header>

<!-- Main Content: Book Info -->
<main class="bg-cream">
  <div class="mx-auto max-w-7xl px-6 py-12 lg:py-16">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">

      <!-- Left: Large Book Cover -->
      <div class="lg:col-span-3">
        <div class="bg-beige rounded-sm overflow-hidden shadow-lg border border-brown-mid/10 aspect-3/4">
          {@html LargeBookCoverSVG}
        </div>
      </div>

      <!-- Center: Metadata -->
      <div class="lg:col-span-6">
        <dl class="space-y-5">
          <!-- Gênero -->
          <div class="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-4">
            <dt class="text-sm font-semibold text-brown-dark">Gênero</dt>
            <dd class="text-sm text-brown-mid">
                Romance
            </dd> 
            <!-- {data.obra.genero} -->
          </div>

          <!-- Idioma original -->
          <div class="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-4">
            <dt class="text-sm font-semibold text-brown-dark">Idioma original</dt>
            <dd class="text-sm text-brown-mid">
                Alemão
            </dd>
            <!-- {data.obra.idioma} --> 
          </div>

          <!-- Primeira publicação -->
          <div class="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-4">
            <dt class="text-sm font-semibold text-brown-dark">Primeira publicação</dt>
            <dd class="text-sm text-brown-mid">{data.obra.publicacao}</dd>
          </div>

          <!-- Resumo -->
          <div class="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-4">
            <dt class="text-sm font-semibold text-brown-dark">Resumo</dt>
            <dd class="text-sm text-brown-mid leading-relaxed space-y-3">
            {#if data.obra.resumo}
                <p>{data.obra.resumo}</p>
            {:else}
                <p>Sem resumo.</p>
            {/if}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>

  <!-- Edições no Brasil Section -->
  <section class="border-t border-beige bg-cream/50">
    <div class="mx-auto max-w-7xl px-6 py-12 lg:py-16">
      <!-- Section Header -->
      <div class="mb-8">
        <h2 class="font-serif text-2xl font-bold text-brown-dark flex items-center gap-3 mb-2">
          <BookOpen class="w-6 h-6 text-brown-warm" stroke-width={1.5} />
          Edições
        </h2>
        <p class="text-sm text-brown-mid">
          Edições, traduções e reimpressões localizadas em catálogos e jornais do século XIX.
        </p>
      </div>

      <!-- Editions Table -->
      <div class="border-t border-beige">
        <!-- Table Header -->
        <div class="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-beige/30 text-xs font-semibold text-brown-mid uppercase tracking-wider">
          <div class="col-span-4">Título da edição</div>
          <div class="col-span-2">Tradutor(a)</div>
          <div class="col-span-1">Ano</div>
          <div class="col-span-2">Local</div>
          <div class="col-span-3">Fonte</div>
        </div>

        <!-- Table Rows -->
        <div class="divide-y divide-beige">
          {#each data.obra.edicoes as edicao}
            <a href={resolve("#")}
              class="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 py-5 hover:bg-beige/30 transition-colors group"
            >
              <!-- Título da edição -->
              <div class="col-span-4 flex items-center gap-4">
                <div class="w-10 h-14 flex-shrink-0 bg-beige rounded-sm overflow-hidden border border-brown-mid/10 shadow-sm">
                  {@html BookCoverSVG}
                </div>
                <span class="font-serif text-base font-semibold text-brown-dark group-hover:text-brown-warm transition-colors">
                  {edicao.nome}
                </span>
              </div>

              <!-- Tradutor(a) -->
              <div class="col-span-2 flex items-center">
                <span class="text-sm text-brown-mid">{edicao["tradutor-adaptador"]}</span>
              </div>

              <!-- Ano -->
              <div class="col-span-1 flex items-center">
                <span class="text-sm text-brown-mid">{edicao.publicacao}</span>
              </div>

              <!-- Local -->
              <div class="col-span-2 flex items-center">
                <span class="text-sm text-brown-mid">
                {#if Object.hasOwn(edicao, "local")}
                    {edicao.local}
                {:else}
                    --
                {/if}
                </span>
              </div>

              <!-- Fonte -->
              <div class="col-span-3 flex items-center">
                <span class="text-sm text-brown-mid">
                {#if Object.hasOwn(edicao, "fonte")}
                    {edicao.fonte}
                {:else}
                    --
                {/if}
                </span>
              </div>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </section>
</main>