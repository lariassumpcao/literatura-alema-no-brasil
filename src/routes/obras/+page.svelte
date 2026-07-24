<script lang="ts">
    import Obra from '$lib/components/Obra.svelte';
    let { data } = $props();
    import { Search, ChevronDown } from "lucide-svelte";
    import { resolve } from '$app/paths';

    const livro_placeholder = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" class="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs>
    <!-- Papel falso simulado -->
    <linearGradient id="paper-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F7F4EE" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#6B5E4E" stop-opacity="0.15"/>
    </linearGradient>
    </defs>
    
    <!-- Base -->
    <rect width="100" height="140" fill="#E9E2D5"/>
    <rect width="100" height="140" fill="url(#paper-grad)"/>
    
    <!-- Borda dupla -->
    <rect x="6" y="6" width="88" height="128" fill="none" stroke="#6B5E4E" stroke-width="0.8" opacity="0.6"/>
    <rect x="10" y="10" width="80" height="120" fill="none" stroke="#6B5E4E" stroke-width="0.4" opacity="0.4"/>
    
    <!-- Título simulado -->
    <rect x="25" y="22" width="50" height="2" fill="#3E3128" opacity="0.7"/>
    <rect x="30" y="28" width="40" height="2" fill="#3E3128" opacity="0.7"/>
    <rect x="20" y="34" width="60" height="2" fill="#3E3128" opacity="0.7"/>
    
    <!-- Decoração -->
    <circle cx="50" cy="70" r="12" fill="none" stroke="#A67C52" stroke-width="1" opacity="0.6"/>
    <circle cx="50" cy="70" r="8" fill="none" stroke="#A67C52" stroke-width="0.5" opacity="0.6"/>
    <path d="M50 58 L50 82 M38 70 L62 70" stroke="#A67C52" stroke-width="0.5" opacity="0.6"/>
    <circle cx="50" cy="70" r="2" fill="#A67C52" opacity="0.6"/>
    
    <!-- Texto simulado -->
    <rect x="35" y="102" width="30" height="1.5" fill="#3E3128" opacity="0.6"/>
    <rect x="30" y="108" width="40" height="1.5" fill="#3E3128" opacity="0.6"/>
    <rect x="40" y="118" width="20" height="1.5" fill="#3E3128" opacity="0.5"/>
    </svg>
    `

    const divisor_decorativo_antigo = `
        <svg width="16" height="16" viewBox="0 0 16 16" class="text-brown-warm shrink-0">
        <path d="M8 0 L16 8 L8 16 L0 8 Z" fill="currentColor" opacity="0.6"/>
        <circle cx="8" cy="8" r="2" fill="currentColor"/>
        </svg>
    `

    let busca_nome = $state("");
    let data_minimo = $derived(data.primeira_publicacao);
    let data_maximo = $derived(data.ultima_publicacao);
    let autoresSelecionados = $state<string[]>([]);
    let ordenar_por = $state("nome-crescente");

    let obras_filtradas = $derived(
        data.obras.filter(obra => {
            const match_nome = busca_nome === "" || 
                obra.nome.toLowerCase().includes(busca_nome.toLowerCase()) ||
                `${obra.autor?.nome} ${obra.autor?.sobrenome}`.toLowerCase().includes(busca_nome.toLowerCase())
            
            const match_datas = (obra.publicacao <= data_maximo && obra.publicacao >= data_minimo);
            
            const match_autor = autoresSelecionados.length === 0 || 
                autoresSelecionados.includes(`${obra.autor?.nome} ${obra.autor?.sobrenome}`);

            return match_nome && match_datas && match_autor

        }).sort((a, b) => {
            switch(ordenar_por) {
                case "nome-crescente":
                    return a.nome.localeCompare(b.nome);
                case "nome-decrescente":
                    return b.nome.localeCompare(a.nome);
                case "publicacao-crescente":
                    return a.publicacao - b.publicacao;
                case "publicacao-decrescente":
                    return b.publicacao - a.publicacao;
                default:
                    return 0;
            }
        })
    );
    
    function limparFiltros() {
        busca_nome = "";
        data_minimo = data.primeira_publicacao;
        data_maximo = data.ultima_publicacao;
        ordenar_por = "nome-crescente";
    }

    function toggleAutor(nome_autor: string) {
        if (autoresSelecionados.includes(nome_autor)) {
        autoresSelecionados = autoresSelecionados.filter(c => c !== nome_autor);
        } else {
        autoresSelecionados = [...autoresSelecionados, nome_autor];
        }
    }

</script>
<svelte:head>
  <title>Obras - Literatura em Língua Alemã</title>
</svelte:head>

<!-- Breadcrumb -->
<nav class="relative w-full bg-cream border-b border-beige">
  <div class="mx-auto max-w-7xl px-6 py-3">
    <ol class="flex items-center gap-2 text-sm text-brown-mid">
      <li><a href={resolve("/")} class="hover:text-brown-dark transition-colors">Início</a></li>
      <li><span class="text-brown-mid">/</span></li>
      <li class="text-brown-dark font-medium">Obras</li>
    </ol>
  </div>
</nav>

<!-- Header -->
<header class="bg-cream relative overflow-hidden w-full">
    <div 
    class="absolute inset-0 bg-[url('/obras-header.png')] bg-cover bg-center"
    ></div>
    <div class="absolute inset-0 bg-cream/70 pointer-events-none"></div>

    <div class="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div class="max-w-2xl">
            <h1 class="font-serif text-4xl md:text-5xl font-bold text-brown-dark mb-4">
                Obras
            </h1>

            <!-- Custom Decorative Line -->
            <div class="flex items-center gap-4 my-6 max-w-md">
                <div class="h-px flex-1 bg-brown-mid/40"></div>
                {@html divisor_decorativo_antigo}
                <div class="h-px flex-1 bg-brown-mid/40"></div>
            </div>

            <p class="text-brown-mid leading-relaxed">
                Obras de língua alemã que circularam, foram traduzidas ou 
                anunciadas no Brasil do século XIX.
            </p>
        </div>
    </div>
    
  
  <!-- Decorative background element
  <div class="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
    <div class="h-full bg-linear-to-l from-brown-dark to-transparent"></div>
  </div> -->
</header>

<!-- Main Content -->
<main class="bg-cream min-h-screen pb-12 w-full">
  <div class="mx-auto max-w-7xl px-6 py-8">
    <div class="flex flex-col lg:flex-row gap-8">
      
      <!-- Sidebar Filters -->
      <aside class="w-full lg:w-64 shrink-0">
        <div class="bg-beige/40 border border-beige rounded-sm p-6 sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <!-- Fixed Header Layout -->
        <div class="flex items-start justify-between mb-8 pb-6 border-b border-beige">
        <div class="flex items-center gap-3">
            <!-- <SlidersHorizontal class="w-5 h-5 text-brown-mid mt-1 flex-shrink-0" stroke-width={1.5} /> -->
            <h2 class="font-serif text-lg font-bold text-brown-dark leading-tight">
            Filtrar autores
            </h2>
        </div>
        <button 
            onclick={limparFiltros}
            class="flex items-center gap-2 text-sm underline text-brown-mid hover:text-brown-dark transition-colors mt-1 group"
        >
            <!-- <X class="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" stroke-width={1.5} /> -->
            <span class="leading-tight text-right hidden sm:block">Limpar filtros</span>
            <span class="leading-tight text-right sm:hidden">Limpar</span>
        </button>
        </div>

          <!-- Search -->
          <div class="mb-6">
            <label for="busca-nome" class="block text-sm font-medium text-brown-dark mb-2">
              Busca
            </label>
            <div class="relative">
              <input
                name="busca-nome"
                type="text"
                bind:value={busca_nome}
                placeholder="Nome do autor..."
                class="w-full px-3 py-2 pr-10 border border-beige rounded-sm bg-cream text-brown-dark placeholder-brown-mid/50 focus:outline-none focus:border-brown-warm text-sm"
              />
              <Search class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-mid" />
            </div>
          </div>

          <!-- Multi-Range Date Slider -->
        <div class="mb-8">
        <label for="data-inicio" class="block text-sm font-semibold text-brown-dark mb-4 tracking-wide uppercase text-[11px]">
            Período de atividade
        </label>
        
        <!-- Custom Multi-Range Slider -->
        <div class="relative h-8 flex items-center mb-4">
            <!-- Track Background -->
            <div class="absolute w-full h-1 bg-beige rounded-full"></div>
            <!-- Active Range Fill -->
            <div 
            class="absolute h-1 bg-brown-warm rounded-full"
            style="left: {0.1+((data_minimo - data.primeira_publicacao) / (data.ultima_publicacao-data.primeira_publicacao)) * 100}%; width: {((data_maximo - data_minimo) / (data.ultima_publicacao-data.primeira_publicacao)) * 100}%"
            ></div>
            
            <!-- Min Handle -->
            <input 
            name="data-inicio"
            type="range" 
            min={data.primeira_publicacao} 
            max={data.ultima_publicacao}  
            step="1"
            bind:value={data_minimo}
            class="absolute w-full h-1 appearance-none bg-transparent pointer-events-none 
                    [&::-webkit-slider-thumb]:pointer-events-auto 
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:h-4 
                    [&::-webkit-slider-thumb]:w-4 
                    [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:bg-brown-dark 
                    [&::-webkit-slider-thumb]:border-2 
                    [&::-webkit-slider-thumb]:border-cream
                    [&::-webkit-slider-thumb]:shadow-md
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:pointer-events-auto
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-brown-dark
                    [&::-moz-range-thumb]:border-2
                    [&::-moz-range-thumb]:border-cream
                    [&::-moz-range-thumb]:cursor-pointer"
            />
            <!-- Max Handle -->
            <input 
            type="range" 
            min={data.primeira_publicacao} 
            max={data.ultima_publicacao} 
            step="1"
            bind:value={data_maximo}
            class="absolute w-full h-1 appearance-none bg-transparent pointer-events-none 
                    [&::-webkit-slider-thumb]:pointer-events-auto 
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:h-4 
                    [&::-webkit-slider-thumb]:w-4 
                    [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:bg-brown-dark 
                    [&::-webkit-slider-thumb]:border-2 
                    [&::-webkit-slider-thumb]:border-cream
                    [&::-webkit-slider-thumb]:shadow-md
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:pointer-events-auto
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-brown-dark
                    [&::-moz-range-thumb]:border-2
                    [&::-moz-range-thumb]:border-cream
                    [&::-moz-range-thumb]:cursor-pointer"
            />
        </div>

        <!-- Numeric Inputs -->
        <div class="flex gap-3">
            <div class="relative flex-1">
            <input
                type="number"
                bind:value={data_minimo}
                min={data.primeira_publicacao}
                max={data_maximo}
                class="w-full px-3 py-2 border border-beige rounded-sm bg-cream text-brown-dark text-sm text-center focus:outline-none focus:border-brown-warm transition-colors"
            />
            </div>
            <div class="relative flex-1">
            <input
                type="number"
                bind:value={data_maximo}
                min={data_minimo}
                max={data.ultima_publicacao}
                class="w-full px-3 py-2 border border-beige rounded-sm bg-cream text-brown-dark text-sm text-center focus:outline-none focus:border-brown-warm transition-colors"
            />
            </div>
        </div>

        <!-- Autores -->
        <div class="mb-8">
        <label for="" class="block text-sm font-semibold text-brown-dark mb-4 tracking-wide uppercase text-[11px]">
            Autor da obra
        </label>
        <div class="space-y-3">
            {#each data.autores as autor}
            <label class="flex items-center gap-3 cursor-pointer group">
                <input
                type="checkbox"
                checked={autoresSelecionados.includes(`${autor.nome} ${autor.sobrenome}`)}
                onchange={() => toggleAutor(`${autor.nome} ${autor.sobrenome}`)}
                class="w-4 h-4 rounded-sm border-beige text-brown-warm focus:ring-brown-warm focus:ring-offset-0 accent-brown-warm cursor-pointer"
                />
                <span class="text-sm text-brown-mid group-hover:text-brown-dark transition-colors flex-1">
                {autor.nome} <b>{autor.sobrenome}</b>
                </span>
                <span class="text-xs text-brown-mid/60">({autor.num_obras})</span>
            </label>
            {/each}
        </div>
        </div>

        </div>

          <!-- Sort -->
          <div>
            <label for="ordenar-por" class="block text-sm font-medium text-brown-dark mb-2">
              Ordenar por
            </label>
            <div class="relative">
              <select
                name="ordenar-por"
                bind:value={ordenar_por}
                class="w-full px-3 py-2 pr-8 border border-beige rounded-sm bg-cream text-brown-dark text-sm appearance-none focus:outline-none focus:border-brown-warm cursor-pointer"
              >
                <option value="nome-crescente">Nome (A-Z)</option>
                <option value="nome-decrescente">Nome (Z-A)</option>
                <option value="sobrenome-crescente">Sobrenome (A-Z)</option>
                <option value="sobrenome-decrescente">Sobrenome (Z-A)</option>
                <option value="nascimento-crescente">Ano de nascimento (crescente)</option>
                <option value="nascimento-decrescente">Ano de nascimento (decrescente)</option>
                <option value="morte-crescente">Ano de morte (crescente)</option>
                <option value="morte-decrescente">Ano de morte (decrescente)</option>
              </select>
              <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-mid pointer-events-none" />
            </div>
          </div>
        </div>
      </aside>

      <div class="flex-1">
        <div class="flex items-center justify-between mb-6">
          <p class="text-brown-dark font-serif text-lg">
            {obras_filtradas.length} {#if obras_filtradas.length > 1}obras encontradas{:else}obra encontrada{/if}
          </p>
        </div>

        <!-- Lista de obras -->
        <div class="flex flex-col gap-0 border-t border-beige bg-cream rounded-sm overflow-hidden shadow-sm">
          {#each obras_filtradas as obra}
            <article class="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-6 border-b border-beige last:border-b-0 hover:bg-beige/40 transition-colors group">
      
            <!-- 1. Cover Image (SVG Placeholder) -->
            <div class="w-20 h-28 sm:w-24 sm:h-32 shrink-0 bg-beige rounded-sm overflow-hidden shadow-sm border border-brown-mid/10">
                {@html livro_placeholder}
            </div>

            <!-- 2. Main Information -->
            <div class="flex-1 min-w-0">
                <h3 class="font-serif text-xl font-semibold text-brown-dark mb-1 group-hover:text-brown-warm transition-colors">
                {obra.nome}
                <!-- {#if obra.subtitulo}
                    <span class="font-normal text-base text-brown-mid">({obra.subtitulo})</span>
                {/if} -->
                </h3>
                
                <p class="text-sm font-medium text-brown-dark mb-1">{@html `${obra.autor?.nome} <b>${obra.autor?.sobrenome}</b>`}</p>
                
                <!-- {#if obra.tradutor}
                <p class="text-sm text-brown-mid mb-1">Tradução de {obra.tradutor}</p>
                {/if} -->
                
                <!-- <p class="text-sm text-brown-mid mb-4">{obra.publicationInfo}</p> -->
            </div>

            <!-- 3. Metadata & Action Button -->
            <div class="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-3 sm:gap-4 sm:min-w-35 pt-2 sm:pt-0">
                <div class="text-right">
                <p class="text-sm font-semibold text-brown-dark">{obra.publicacao}</p>
                <p class="text-sm font-semibold text-brown-dark">{obra.edicoes.length} {#if obra.edicoes.length > 1} edições cadastradas{:else} edição cadastrada{/if}</p>
                </div>
                
                <a 
                href="{resolve("/obras")}/{obra.url_simples}"
                class="px-4 py-2 border border-brown-mid/30 rounded-sm text-sm font-medium text-brown-dark hover:bg-brown-dark hover:text-cream hover:border-brown-dark transition-all"
                >
                Ver detalhes
                </a>
            </div>

            </article>
          {/each}
        </div>

        <!-- Empty state -->
        {#if obras_filtradas.length === 0}
          <div class="text-center py-16">
            <p class="text-brown-mid text-lg">Nenhuma obra encontrada com os filtros selecionados.</p>
            <button 
              onclick={limparFiltros}
              class="mt-4 text-brown-warm hover:text-brown-dark font-medium"
            >
              Limpar filtros
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</main>