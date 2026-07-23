<script lang="ts">
    let { data } = $props(); 
    import Obra from '$lib/components/Obra.svelte';

    import {
        ArrowRight,
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

    const divisor_decorativo_antigo = `
        <svg width="16" height="16" viewBox="0 0 16 16" class="text-brown-warm shrink-0">
        <path d="M8 0 L16 8 L8 16 L0 8 Z" fill="currentColor" opacity="0.6"/>
        <circle cx="8" cy="8" r="2" fill="currentColor"/>
        </svg>
    `
    
</script>

<svelte:head>
  <title>{data.autor.nome} {data.autor.sobrenome} - Autores</title>
</svelte:head>

<nav class="relative w-full bg-cream border-b border-beige">
  <div class="mx-auto max-w-7xl px-6 py-3">
    <ol class="flex items-center gap-2 text-sm text-brown-mid">
      <li><a href="/" class="hover:text-brown-dark transition-colors">Início</a></li>
      <li><span class="text-brown-mid">/</span></li>
      <li><a href="/autores" class="hover:text-brown-dark transition-colors">Autores</a></li>
      <li><span class="text-brown-mid">/</span></li>
      <li class="text-brown-dark font-medium">{data.autor.nome} {data.autor.sobrenome}</li>
    </ol>
  </div>
</nav>

<!-- Header with Portrait Background -->
<header class="relative bg-cream overflow-hidden w-full">
  <!-- Background portrait image with gradient mask -->
  <div
    class="absolute inset-0 bg-[url('/autores-header.png')] bg-cover bg-right"
    style="
      mask-image: linear-gradient(90deg, transparent 0%, transparent 40%, black 70%);
      -webkit-mask-image: linear-gradient(90deg, transparent 0%, transparent 40%, black 70%);
      opacity: 0.75;
    "
  ></div>

  <!-- Subtle overlay for text readability -->
  <div class="absolute inset-0 bg-cream/60 pointer-events-none"></div>

  <div class="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:py-16">
    <div class="max-w-2xl">
      <h1 class="font-serif text-5xl md:text-6xl font-bold text-brown-dark mb-1">
        {data.autor.nome} {data.autor.sobrenome}
      </h1>
      <p class="font-serif text-2xl md:text-3xl text-brown-mid mb-4">
        ({data.autor.nascimento}–{data.autor.morte})
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

<!-- <section class="bg-cream border-b border-beige">
  <div class="mx-auto max-w-7xl px-6 py-6">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div>
        <p class="text-sm font-semibold text-brown-dark">{data.autor.nacionalidade}</p>
        <p class="text-xs text-brown-mid mt-0.5">Nacionalidade</p>
      </div>

      <div class="flex items-start gap-3">
        <Briefcase class="w-5 h-5 text-brown-warm flex-shrink-0 mt-0.5" stroke-width={1.5} />
        <div>
          <p class="text-sm font-semibold text-brown-dark leading-snug">{data.autor.profissao}</p>
          <p class="text-xs text-brown-mid mt-0.5">Profissão</p>
        </div>
      </div>

      <div class="flex items-start gap-3">
        <CalendarDays class="w-5 h-5 text-brown-warm flex-shrink-0 mt-0.5" stroke-width={1.5} />
        <div>
          <p class="text-sm font-semibold text-brown-dark">{data.autor.nascimento}–{data.autor.morte}</p>
          <p class="text-xs text-brown-mid mt-0.5">Período de vida</p>
        </div>
      </div>

      <div class="flex items-start gap-3">
        <MapPin class="w-5 h-5 text-brown-warm flex-shrink-0 mt-0.5" stroke-width={1.5} />
        <div>
          <p class="text-sm font-semibold text-brown-dark">{data.autor.pais}</p>
          <p class="text-xs text-brown-mid mt-0.5">País de origem</p>
        </div>
      </div>
    </div>
  </div>
</section> -->

<!-- Main Content: Bio + Biographical Data -->
<main class="bg-cream w-full">
  {#if data.autor.bio}
  <div class="mx-auto max-w-7xl px-6 py-12 lg:py-16">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      
      <!-- Left Column: About the Author -->
      <div class="lg:col-span-2">
        <h2 class="font-serif text-2xl font-bold text-brown-dark mb-6">
          Sobre o autor
        </h2>
        <div class="space-y-4 text-brown-mid leading-relaxed">
          {#each data.autor.bio as paragraph}
            <p>{paragraph}</p>
          {/each}
        </div>
      </div>

      <!-- Right Column: Biographical Data Card -->
      <!-- <div>
        <div class="bg-beige/40 border border-beige rounded-sm p-6">
          <h3 class="font-serif text-sm font-bold text-brown-dark uppercase tracking-wider mb-6">
            Dados biográficos
          </h3>

          <dl class="space-y-5">
            <div>
              <dt class="text-xs font-semibold text-brown-dark uppercase tracking-wide mb-1">
                Nascimento
              </dt>
              <dd class="text-sm text-brown-mid leading-relaxed">
                {data.autor.nascimento}
              </dd>
            </div>

            <div>
              <dt class="text-xs font-semibold text-brown-dark uppercase tracking-wide mb-1">
                Falecimento
              </dt>
              <dd class="text-sm text-brown-mid leading-relaxed">
                {data.autor.morte}
              </dd>
            </div>

            <div>
              <dt class="text-xs font-semibold text-brown-dark uppercase tracking-wide mb-1">
                Principais atividades
              </dt>
              <dd class="text-sm text-brown-mid leading-relaxed">
                {data.autor.atividades}
              </dd>
            </div>

            <div>
              <dt class="text-xs font-semibold text-brown-dark uppercase tracking-wide mb-1">
                Idiomas
              </dt>
              <dd class="text-sm text-brown-mid leading-relaxed">
                {data.autor.idiomas}
              </dd>
            </div>

            <div>
              <dt class="text-xs font-semibold text-brown-dark uppercase tracking-wide mb-1">
                Obras conhecidas
              </dt>
              <dd class="text-sm text-brown-mid leading-relaxed">
                {data.autor.principais_obras}
              </dd>
            </div>
          </dl>
        </div>
      </div> -->
    </div>
  </div>
  {/if}

  <!-- Works Section -->
  <section class="border-t border-beige bg-cream/50">
    <div class="mx-auto max-w-7xl px-6 py-12 lg:py-16">
      <!-- Section Header -->
      <div class="flex items-start justify-between mb-8">
        <div>
          <h2 class="font-serif text-2xl font-bold text-brown-dark flex items-center gap-3 mb-2">
            <BookOpen class="w-6 h-6 text-brown-warm" stroke-width={1.5} />
            Obras do autor
          </h2>
          <p class="text-sm text-brown-mid">
            Principais obras de {data.autor.sobrenome} que circularam no Brasil.
          </p>
        </div>
        <!-- <a
          href="/obras"
          class="inline-flex items-center gap-2 px-4 py-2 border border-brown-mid/30 rounded-sm text-sm font-medium text-brown-dark hover:bg-brown-dark hover:text-cream hover:border-brown-dark transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          Ver todas as obras
        </a> -->
      </div>

      <!-- Works Table -->
      <div class="border-t border-beige">
        <!-- Table Header -->
        <div class="hidden md:grid grid-cols-8 gap-4 px-4 py-3 bg-beige/30 text-xs font-semibold text-brown-mid uppercase tracking-wider">
          <div class="col-span-4">Obra</div>
          <!-- <div class="col-span-2">Gênero</div> -->
          <div class="col-span-3">Primeira publicação</div>
          <!-- <div class="col-span-2">Destaque no Brasil</div> -->
          <div class="col-span-1"></div>
        </div>

        <!-- Table Rows -->
        <div class="divide-y divide-beige">
          {#each data.obras_autor as obra}
            <a
              href="/obras/{obra.url_simples}"
              class="grid grid-cols-1 md:grid-cols-8 gap-3 md:gap-4 px-4 py-5 hover:bg-beige/30 transition-colors group"
            >
              <!-- Obra -->
              <div class="col-span-4 flex items-center gap-4">
                <div class="w-10 h-14 shrink-0 bg-beige rounded-sm overflow-hidden border border-brown-mid/10 shadow-sm">
                  {@html BookCoverSVG}
                </div>
                <span class="font-serif text-base font-semibold text-brown-dark group-hover:text-brown-warm transition-colors">
                  {obra.nome}
                </span>
              </div>

              <!-- Gênero -->
              <!-- <div class="col-span-2 flex items-center">
                <span class="text-sm text-brown-mid">{obra.genero}</span>
              </div> -->

              <!-- Primeira publicação -->
              <div class="col-span-3 flex items-center">
                <span class="text-sm text-brown-mid">{obra.publicacao}</span>
              </div>

              <!-- Destaque no Brasil -->
              <!-- <div class="col-span-2 flex items-center">
                <span class="text-sm text-brown-mid">{obra.destaque}</span>
              </div> -->

              <!-- Arrow -->
              <div class="col-span-1 flex items-center justify-end">
                <ArrowRight class="w-4 h-4 text-brown-mid group-hover:text-brown-dark group-hover:translate-x-1 transition-all" stroke-width={1.5} />
              </div>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </section>
</main>