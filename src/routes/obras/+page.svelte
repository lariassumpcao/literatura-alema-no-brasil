<script lang="ts">
    let { data } = $props();
    import { Search, ChevronDown } from "lucide-svelte";
    import { resolve } from '$app/paths';

    import cabecalho_obras from '$lib/assets/obras-header.png';
    import livro_placeholder from '$lib/assets/capa-livro.svg';
    // import { obras } from "$lib/bd.js";

    let busca_nome = $state("");
    let data_minimo = $derived(data.primeira_publicacao);
    let data_maximo = $derived(data.ultima_publicacao);
    let autoresSelecionados = $state<string[]>([]);
    let ordenar_por = $state("nome-crescente");
    let mostrar_sem_data = $state(true);
    let obras_sem_data = $derived(
      data.obras.filter((obra) => obra.publicacao <= 0).length
    );

    let obras_filtradas = $derived(
        data.obras.filter(obra => {
            const match_nome = busca_nome === "" || 
                obra.nome.toLowerCase().includes(busca_nome.toLowerCase()) ||
                `${obra.autor?.nome} ${obra.autor?.sobrenome}`.toLowerCase().includes(busca_nome.toLowerCase())
            
            const sem_data = obra.publicacao <= 0;
            const match_datas = sem_data
                ? mostrar_sem_data
                : (obra.publicacao >= data_minimo && obra.publicacao <= data_maximo);
            
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
      mostrar_sem_data = true;
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
<header class="bg-cream relative overflow-hidden w-full h-66">
    <div 
    class="absolute inset-0 overflow-hidden"
    >
      <img class="w-full h-full object-cover object-right" src={cabecalho_obras} alt="Cabeçalho da área dos autores."/>
    </div>
    <div class="absolute inset-0 bg-cream/70 pointer-events-none"></div>

    <div class="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div class="max-w-2xl">
            <h1 class="font-serif text-4xl md:text-5xl font-bold text-brown-dark mb-4">
                Obras
            </h1>

            <!-- Custom Decorative Line -->
            <div class="flex items-center gap-4 my-6 max-w-md">
                <div class="h-px flex-1 bg-brown-mid/40"></div>
                <svg width="16" height="16" viewBox="0 0 16 16" class="text-brown-warm shrink-0">
                  <path d="M8 0 L16 8 L8 16 L0 8 Z" fill="currentColor" opacity="0.6"/>
                  <circle cx="8" cy="8" r="2" fill="currentColor"/>
                </svg>
                <div class="h-px flex-1 bg-brown-mid/40"></div>
            </div>

            <p class="text-brown-mid leading-relaxed">
                Obras de língua alemã que circularam, foram traduzidas ou 
                anunciadas no Brasil do século XIX.
            </p>
        </div>
    </div>
</header>

<!-- Main Content -->
<main class="bg-cream min-h-screen pb-12 w-full">
  <div class="mx-auto max-w-7xl px-6 py-8">
    <div class="flex flex-col lg:flex-row gap-8">
      
      <!-- Sidebar Filters -->
      <aside class="w-full lg:w-72 shrink-0">
        <div class="bg-beige/40 border border-beige rounded-sm p-6 sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <!-- Fixed Header Layout -->
        <div class="flex items-start justify-between mb-8 pb-6 border-b border-beige">
        <div class="flex items-center gap-3">
            <!-- <SlidersHorizontal class="w-5 h-5 text-brown-mid mt-1 flex-shrink-0" stroke-width={1.5} /> -->
            <h2 class="font-serif text-lg font-bold text-brown-dark leading-tight">
            Filtrar obras
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
                placeholder="Nome do autor, da obra..."
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

        <!-- Toggle: show works without date -->
        <div class="mt-4">
          <label class="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              bind:checked={mostrar_sem_data}
              class="w-4 h-4 mt-0.5 rounded-sm border-beige text-brown-warm focus:ring-brown-warm focus:ring-offset-0 accent-brown-warm cursor-pointer"
            />
            <div>
              <span class="text-sm text-brown-dark group-hover:text-brown-warm transition-colors">
                Mostrar obras sem data de publicação 
                {#if obras_sem_data > 0}
                  ({obras_sem_data} {obras_sem_data > 1 ? 'obras' : 'obra'})
                {/if}
              </span>
              <p class="text-xs text-brown-mid/70 mt-0.5 mb-4 leading-relaxed">
                Como essas obras não possuem ano de publicação preciso, o filtro por período não se aplica a elas.
              </p>
            </div>
          </label>
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
            {obras_filtradas.length} {#if obras_filtradas.length > 1}obras encontradas{:else}obra encontrada{/if} de um total de {data.obras.length}.
          </p>
        </div>

        <!-- Lista de obras -->
        <div class="flex flex-col gap-0 border-t border-beige bg-cream rounded-sm overflow-hidden shadow-sm">
          {#each obras_filtradas as obra}
            <article class="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-6 border-b border-beige last:border-b-0 hover:bg-beige/40 transition-colors group">
      
            <!-- 1. Cover Image (SVG Placeholder) -->
            <div class="w-20 h-28 sm:w-24 sm:h-32 shrink-0 bg-beige rounded-sm overflow-hidden shadow-sm border border-brown-mid/10">
                <img class="" src={livro_placeholder} alt="Capa do livro" />
            </div>

            <!-- 2. Main Information -->
            <div class="flex-1 min-w-0">
                <h3 class="font-serif text-xl font-semibold text-brown-dark mb-1 group-hover:text-brown-warm transition-colors">
                {obra.nome}
                <!-- {#if obra.subtitulo}
                    <span class="font-normal text-base text-brown-mid">({obra.subtitulo})</span>
                {/if} -->
                </h3>
                
                <p class="text-sm font-medium text-brown-dark mb-1">{@html `${obra.autor?.nome ? obra.autor?.nome : 'autor'} <b>${obra.autor?.sobrenome ? obra.autor?.sobrenome : 'desconhecido'}</b>`}</p>
                
                <!-- {#if obra.tradutor}
                <p class="text-sm text-brown-mid mb-1">Tradução de {obra.tradutor}</p>
                {/if} -->
                
                <!-- <p class="text-sm text-brown-mid mb-4">{obra.publicationInfo}</p> -->
            </div>

            <!-- 3. Metadata & Action Button -->
            <div class="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-3 sm:gap-4 sm:min-w-35 pt-2 sm:pt-0">
                <div class="text-right">
                <p class="text-sm font-semibold text-brown-dark">{obra.publicacao > 0 ? obra.publicacao : '--'}</p>
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