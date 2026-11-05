<script lang="ts">
    import { Search, ChevronDown } from "lucide-svelte";
    import { resolve } from '$app/paths';
    import BarChart from '$lib/components/BarChart.svelte';

    import type { PageData } from './$types';
	  import type { Autor, Obra, Edicao, ObraResumo, AutorResumo } from '$lib/utils/types';


    import cabecalho_obras from '$lib/assets/obras-header.png';
    import livro_placeholder from '$lib/assets/capa-livro.svg';

    let { data } = $props<{ data: PageData }>();

    let busca_nome = $state("");
    // FIX: Changed from $derived to $state so they can be bound to inputs
    let data_minimo = $derived(data.primeira_publicacao);
    let data_maximo = $derived(data.ultima_publicacao);
    let autoresSelecionados = $state<string[]>([]);
    
    let showAuthorDropdown = $state(false);

    let filtro_idade_tipo = $state<'nascimento' | 'morte' | 'ambos'>('ambos');
    let idade_min = $derived(data.primeiro_nascimento);
    let idade_max = $derived(data.ultima_morte);
    let busca_autor_dropdown = $state("");

    function autorMatchAge(autor: AutorResumo, min: number, max: number, type: string): boolean {
        // Fallback to 0 for birth and 9999 for death if data is missing
        const nasc = autor.nascimento || 0;
        const morte = autor.morte || 9999;

        if (type === 'nascimento') {
            return nasc >= min && nasc <= max;
        }
        if (type === 'morte') {
            return morte >= min && morte <= max;
        }
        if (type === 'ambos') {
            // "Ativo no período": Overlap logic (birth <= max AND death >= min)
            return nasc <= max && morte >= min;
        }
        return true;
    }

    let autores_validos_idade = $derived(
        data.autores.filter(autor => autorMatchAge(autor, idade_min, idade_max, filtro_idade_tipo))
    );

    let autoresSelecionadosDetalhes = $derived(
        autoresSelecionados.flatMap((nome_completo) => {
            const autor = data.autores.find(
                (autor) => `${autor.nome} ${autor.sobrenome}` === nome_completo
            );

            return autor ? [autor] : [];
        })
    );

    let autoresNaoSelecionados = $derived(
        autores_validos_idade.filter((autor) => {
            const nome_completo = `${autor.nome} ${autor.sobrenome}`;

            if (autoresSelecionados.includes(nome_completo)) {
                return false;
            }

            if (!busca_autor_dropdown.trim()) {
                return true;
            }

            return nome_completo
                .toLowerCase()
                .includes(busca_autor_dropdown.trim().toLowerCase());
        })
    );

    // Filter Logic
    let obras_filtradas = $derived(
        data.obras.filter(obra => {
            const match_nome = busca_nome === "" || 
                obra.nome.toLowerCase().includes(busca_nome.toLowerCase()) ||
                `${obra.autor?.nome} ${obra.autor?.sobrenome}`.toLowerCase().includes(busca_nome.toLowerCase());
            
            const match_datas = obra.publicacao >= data_minimo && obra.publicacao <= data_maximo;
            
            const match_idade = obra.autor ? autorMatchAge(obra.autor, idade_min, idade_max, filtro_idade_tipo) : true;
            if (!match_idade) return false;

            const autor_nome = `${obra.autor?.nome} ${obra.autor?.sobrenome}`;
            const match_autor = autoresSelecionados.length === 0 || 
                autoresSelecionados.includes(autor_nome);

            return match_nome && match_datas && match_autor;
        })
    );
    
    // Chart Data Calculations
    let chartDataPorAno = $derived(
        Object.entries(
            obras_filtradas.reduce((acc, obra) => {
                if (obra.publicacao > 0) acc[obra.publicacao] = (acc[obra.publicacao] || 0) + 1;
                return acc;
            }, {} as Record<number, number>)
        )
        .map(([year, count]) => ({ name: year, value: count }))
        .sort((a, b) => Number(a.name) - Number(b.name))
    );

    let chartDataEdicoesPorAno = $derived(
        Object.entries(
            obras_filtradas.reduce((acc, obra) => {
                for (const edicao of obra.edicoes || []) {
                    const ano = parseInt(edicao.publicacao);
                    if (ano > 0) acc[ano] = (acc[ano] || 0) + 1;
                }
                return acc;
            }, {} as Record<number, number>)
        )
        .map(([year, count]) => ({ name: year, value: count }))
        .sort((a, b) => Number(a.name) - Number(b.name))
    );
    
    let filtrosObrasAtivos = $derived(
        busca_nome.trim() !== "" ||
        data_minimo !== data.primeira_publicacao ||
        data_maximo !== data.ultima_publicacao
    );

    function limparFiltrosObras() {
        busca_nome = "";
        data_minimo = data.primeira_publicacao;
        data_maximo = data.ultima_publicacao;
    }

    function limparFiltros() {
        busca_nome = "";
        data_minimo = data.primeira_publicacao;
        data_maximo = data.ultima_publicacao;
        autoresSelecionados = [];
        filtro_idade_tipo = 'ambos';
        idade_min = data.primeiro_nascimento;
        idade_max = data.ultima_morte;
        busca_autor_dropdown = "";
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
  <title>Análise - Literatura em Língua Alemã</title>
</svelte:head>

<!-- Breadcrumb -->
<nav class="relative w-full bg-cream border-b border-beige">
  <div class="mx-auto max-w-7xl px-6 py-3">
    <ol class="flex items-center gap-2 text-sm text-brown-mid">
      <li><a href={resolve("/")} class="hover:text-brown-dark transition-colors">Início</a></li>
      <li><span class="text-brown-mid">/</span></li>
      <li class="text-brown-dark font-medium">Análise</li>
    </ol>
  </div>
</nav>

<!-- Header -->
<header class="bg-cream relative overflow-hidden w-full h-66">
    <div class="absolute inset-0 overflow-hidden">
      <img class="w-full h-full object-cover object-right" src={cabecalho_obras} alt="Cabeçalho"/>
    </div>
    <div class="absolute inset-0 bg-cream/70 pointer-events-none"></div>

    <div class="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div class="max-w-2xl">
            <h1 class="font-serif text-4xl md:text-5xl font-bold text-brown-dark mb-4">Análise</h1>
            <div class="flex items-center gap-4 my-6 max-w-md">
                <div class="h-px flex-1 bg-brown-mid/40"></div>
                <svg width="16" height="16" viewBox="0 0 16 16" class="text-brown-warm shrink-0">
                  <path d="M8 0 L16 8 L8 16 L0 8 Z" fill="currentColor" opacity="0.6"/>
                  <circle cx="8" cy="8" r="2" fill="currentColor"/>
                </svg>
                <div class="h-px flex-1 bg-brown-mid/40"></div>
            </div>
            <p class="text-brown-mid leading-relaxed">
                Elaboração de gráficos informativos sobre as obras e autores de língua alemã no Brasil do século XIX.
            </p>
        </div>
    </div>
</header>

<!-- HORIZONTAL FILTERS -->
<section class="bg-beige/40 border-b border-beige py-8 sticky top-0 z-2 backdrop-blur-sm w-full">
  <div class="mx-auto max-w-7xl px-6 space-y-8">
    
    <!-- 1. Author Filtering Section -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-semibold text-brown-dark uppercase tracking-wide">1. Filtrar por Autores</h3>
        {#if autoresSelecionados.length > 0 || filtro_idade_tipo !== 'ambos' || idade_min !== data.primeiro_nascimento || idade_max !== data.ultima_morte}
          <button onclick={() => {
            autoresSelecionados = [];
            filtro_idade_tipo = 'ambos';
            idade_min = data.primeiro_nascimento;
            idade_max = data.ultima_morte;
            busca_autor_dropdown = "";
          }} class="text-xs text-brown-mid hover:text-brown-dark underline">
            Limpar filtros de autor
          </button>
        {/if}
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left: Age Filter -->
        <div>
          <label for="nascimento" class="block text-xs font-medium text-brown-dark mb-2">Período de vida do autor</label>
          
          <!-- Row 1: Type (Segmented Control) -->
          <div class="inline-flex rounded-sm border border-beige overflow-hidden text-xs mb-3 w-full">
              <button name="nascimento"
                  onclick={() => filtro_idade_tipo = 'nascimento'} 
                  class="flex-1 px-3 py-1.5 transition-colors {filtro_idade_tipo === 'nascimento' ? 'bg-brown-dark text-cream' : 'bg-cream text-brown-dark hover:bg-beige'}"
              >
                  Nascimento
              </button>
              <button 
                  onclick={() => filtro_idade_tipo = 'morte'} 
                  class="flex-1 px-3 py-1.5 transition-colors border-l border-beige {filtro_idade_tipo === 'morte' ? 'bg-brown-dark text-cream' : 'bg-cream text-brown-dark hover:bg-beige'}"
              >
                  Morte
              </button>
              <button 
                  onclick={() => filtro_idade_tipo = 'ambos'} 
                  class="flex-1 px-3 py-1.5 transition-colors border-l border-beige {filtro_idade_tipo === 'ambos' ? 'bg-brown-dark text-cream' : 'bg-cream text-brown-dark hover:bg-beige'}"
              >
                  Ativo no período
              </button>
          </div>

          <!-- Row 2: Range Inputs -->
          <div class="flex gap-2">
              <div class="flex-1">
                  <label for="autor-idade-min" class="block text-[10px] text-brown-mid mb-1">De</label>
                  <input name="autor-idade-min" type="number" bind:value={idade_min} min={data.primeiro_nascimento} max={idade_max}
                      class="w-full px-2 py-1.5 border border-beige rounded-sm bg-cream text-brown-dark text-sm text-center focus:outline-none focus:border-brown-warm" />
              </div>
              <div class="flex-1">
                  <label for="autor-idade-max" class="block text-[10px] text-brown-mid mb-1">Até</label>
                  <input name="autor-idade-max" type="number" bind:value={idade_max} min={idade_min} max={data.ultima_morte}
                      class="w-full px-2 py-1.5 border border-beige rounded-sm bg-cream text-brown-dark text-sm text-center focus:outline-none focus:border-brown-warm" />
              </div>
          </div>
        </div>

        <!-- Right: Name Dropdown -->
        <div>
          <label for="show-authors" class="block text-xs font-medium text-brown-dark mb-2">Nome do autor</label>
          <div class="relative">
            <button name="show-authors"
              onclick={() => showAuthorDropdown = !showAuthorDropdown} 
              class="w-full px-4 py-2 border border-beige rounded-sm bg-cream text-brown-dark text-sm text-left flex justify-between items-center focus:outline-none focus:border-brown-warm hover:border-brown-mid transition-colors"
            >
              <span class="truncate">
                {autoresSelecionados.length === 0 ? 'Todos os autores' : `${autoresSelecionados.length} autor(es) selecionado(s)`}
              </span>
              <span class="transition-transform duration-200" class:rotate-180={showAuthorDropdown}>
                <ChevronDown class="w-4 h-4 text-brown-mid" />
              </span>
            </button>
            
            {#if showAuthorDropdown}
              <div class="absolute top-full left-0 mt-2 w-full max-h-120 overflow-hidden bg-cream border border-beige rounded-sm shadow-lg z-30 flex flex-col">
                
                <!-- Fixed header: search + selected authors -->
                <div class="p-4 border-b border-beige">
                  <div class="relative">
                    <input
                      type="text"
                      bind:value={busca_autor_dropdown}
                      placeholder="Buscar autor..."
                      class="w-full px-3 py-1.5 pr-8 border border-beige rounded-sm bg-cream text-brown-dark placeholder-brown-mid/50 focus:outline-none focus:border-brown-warm text-sm"
                    />

                    <Search class="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brown-mid" />
                  </div>

                  {#if autoresSelecionadosDetalhes.length > 0}
                    <div class="mt-3">
                      <p class="text-[10px] font-semibold uppercase tracking-wide text-brown-mid/70 mb-2">
                        Selecionados
                      </p>

                      <div class="max-h-36 overflow-y-auto pr-1 space-y-2">
                        {#each autoresSelecionadosDetalhes as autor (autor.uid)}
                          <label class="flex items-center gap-3 cursor-pointer text-sm text-brown-dark bg-beige/50 border border-beige rounded-sm px-2 py-1.5">
                            <input
                              type="checkbox"
                              checked={autoresSelecionados.includes(`${autor.nome} ${autor.sobrenome}`)}
                              onchange={() => toggleAutor(`${autor.nome} ${autor.sobrenome}`)}
                              class="w-4 h-4 rounded-sm border-beige text-brown-warm focus:ring-brown-warm focus:ring-offset-0 accent-brown-warm cursor-pointer"
                            />

                            <span class="flex-1">
                              {autor.nome} <b>{autor.sobrenome}</b>
                            </span>

                            <span class="text-xs text-brown-mid/60">
                              ({autor.num_obras})
                            </span>
                          </label>
                        {/each}
                      </div>
                    </div>
                  {/if}
                </div>

                <!-- Scrollable available authors -->
                <div class="p-4 overflow-y-auto flex-1 min-h-0">
                  <p class="text-[10px] font-semibold uppercase tracking-wide text-brown-mid/70 mb-2">
                    Disponíveis
                  </p>

                  <div class="space-y-2">
                    {#each autoresNaoSelecionados as autor (autor.uid)}
                      <label class="flex items-center gap-3 cursor-pointer text-sm text-brown-mid hover:text-brown-dark py-1">
                        <input
                          type="checkbox"
                          checked={autoresSelecionados.includes(`${autor.nome} ${autor.sobrenome}`)}
                          onchange={() => toggleAutor(`${autor.nome} ${autor.sobrenome}`)}
                          class="w-4 h-4 rounded-sm border-beige text-brown-warm focus:ring-brown-warm focus:ring-offset-0 accent-brown-warm cursor-pointer"
                        />

                        <span class="flex-1">
                          {autor.nome} <b>{autor.sobrenome}</b>
                        </span>

                        <span class="text-xs text-brown-mid/60">
                          ({autor.num_obras})
                        </span>
                      </label>
                    {:else}
                      <p class="text-sm text-brown-mid text-center py-4">
                        Nenhum autor encontrado.
                      </p>
                    {/each}
                  </div>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Book Filtering Section -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-semibold text-brown-dark uppercase tracking-wide">
          2. Filtrar Obras
        </h3>

        {#if filtrosObrasAtivos}
          <button
            onclick={limparFiltrosObras}
            class="text-xs text-brown-mid hover:text-brown-dark underline transition-colors"
          >
            Limpar filtros de obras
          </button>
        {/if}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-8 gap-4 items-end">
        
        <!-- Year: From -->
        <div class="md:col-span-2">
          <label for="data-min" class="block text-xs font-medium text-brown-dark mb-1.5">
            Ano da obra (De)
          </label>

          <input
            type="number"
            name="data-min"
            bind:value={data_minimo}
            min={data.primeira_publicacao}
            max={data_maximo}
            class="w-full px-3 py-2 border border-beige rounded-sm bg-cream text-brown-dark text-sm text-center focus:outline-none focus:border-brown-warm"
          />
        </div>
        
        <!-- Year: To -->
        <div class="md:col-span-2">
          <label for="data-max" class="block text-xs font-medium text-brown-dark mb-1.5">
            Ano da obra (Até)
          </label>

          <input
            type="number"
            name="data-min"
            bind:value={data_maximo}
            min={data_minimo}
            max={data.ultima_publicacao}
            class="w-full px-3 py-2 border border-beige rounded-sm bg-cream text-brown-dark text-sm text-center focus:outline-none focus:border-brown-warm"
          />
        </div>

        <!-- Search -->
        <div class="md:col-span-4">
          <label for="busca-nome" class="block text-xs font-medium text-brown-dark mb-1.5">
            Buscar obra ou autor
          </label>

          <div class="relative">
            <input
              type="text"
              name="busca-nome"
              bind:value={busca_nome}
              placeholder="Ex: título da obra ou autor..."
              class="w-full px-3 py-2 pr-10 border border-beige rounded-sm bg-cream text-brown-dark placeholder-brown-mid/50 focus:outline-none focus:border-brown-warm text-sm"
            />

            <Search class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-mid" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CHARTS SECTION -->
<section class="bg-cream py-12 border-b border-beige w-full">
  <div class="mx-auto max-w-7xl px-6">
    <div class="flex items-center gap-4 mb-8 max-w-md mx-auto">
        <div class="h-px flex-1 bg-brown-mid/40"></div>
        <svg width="16" height="16" viewBox="0 0 16 16" class="text-brown-warm shrink-0">
          <path d="M8 0 L16 8 L8 16 L0 8 Z" fill="currentColor" opacity="0.6"/>
          <circle cx="8" cy="8" r="2" fill="currentColor"/>
        </svg>
        <div class="h-px flex-1 bg-brown-mid/40"></div>
    </div>
    <h2 class="font-serif text-3xl font-bold text-brown-dark text-center mb-2">Análise Gráfica</h2>
    <p class="text-brown-mid text-center mb-10 max-w-2xl mx-auto">
      Distribuição temporal das {obras_filtradas.length} {obras_filtradas.length > 1 ? 'obras' : 'obra'} encontrada{obras_filtradas.length > 1 ? 's' : ''}.
    </p>
    
    {#if obras_filtradas.length > 0 && (chartDataPorAno.length > 0 || chartDataEdicoesPorAno.length > 0)}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {#if chartDataPorAno.length > 0}
          <div class="bg-beige/20 border border-beige rounded-sm p-6 shadow-sm">
             <BarChart title="Obras por ano de publicação" data={chartDataPorAno} color="#8B5A2B" />
          </div>
        {/if}
        
        {#if chartDataEdicoesPorAno.length > 0}
          <div class="bg-beige/20 border border-beige rounded-sm p-6 shadow-sm">
             <BarChart title="Edições por ano" data={chartDataEdicoesPorAno} color="#A0522D" />
          </div>
        {/if}
      </div>
    {:else}
      <div class="text-center py-12 bg-beige/20 border border-dashed border-beige rounded-sm">
        <p class="text-brown-mid">Nenhuma data de publicação válida encontrada para gerar os gráficos com os filtros atuais.</p>
      </div>
    {/if}
  </div>
</section>

