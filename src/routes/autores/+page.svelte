<script lang="ts">
    import { resolve } from '$app/paths';
    import { Search, ChevronDown } from "lucide-svelte";

    // SVG Profile Placeholders
    const PerfilMasculino = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#E9E2D5"/>
        <circle cx="50" cy="35" r="20" fill="#6B5E4E"/>
        <path d="M 20 90 Q 50 70 80 90 L 80 100 L 20 100 Z" fill="#6B5E4E"/>
        <path d="M 30 90 Q 50 85 70 90" stroke="#3E3128" stroke-width="2" fill="none"/>
        </svg>
    `;

    const PerfilFeminino = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#E9E2D5"/>
        <circle cx="50" cy="35" r="18" fill="#6B5E4E"/>
        <path d="M 25 90 Q 50 75 75 90 L 75 100 L 25 100 Z" fill="#6B5E4E"/>
        <path d="M 35 20 Q 50 10 65 20" stroke="#6B5E4E" stroke-width="3" fill="none"/>
        <path d="M 30 90 Q 50 85 70 90" stroke="#3E3128" stroke-width="2" fill="none"/>
        </svg>
    `;

    const PerfilDesconhecido = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#E9E2D5"/>
        <circle cx="50" cy="40" r="20" fill="#6B5E4E"/>
        <path d="M 20 90 Q 50 70 80 90 L 80 100 L 20 100 Z" fill="#6B5E4E"/>
        <text x="50" y="45" text-anchor="middle" fill="#3E3128" font-size="20" font-family="serif">?</text>
        </svg>
    `;

    let { data } = $props();

    // states de Filtro
    let busca_nome = $state("");
    let ano_inicio = $derived(data.primeiro_nascimento);
    let ano_fim = $derived(data.ultima_morte);
    let ordenar_por = $state("nome-crescente");

    let autores_filtrados = $derived(
        data.autores.filter(autor => {
            if (autor.sobrenome == "Desconhecido") {return false}

            const nome_completo = `${autor.nome} ${autor.sobrenome}`.toLowerCase();
            const match_nome = busca_nome === "" || 
                nome_completo.includes(busca_nome.toLowerCase()) ||
                autor.nome.toLowerCase().includes(busca_nome.toLowerCase()) ||
                autor.sobrenome.toLowerCase().includes(busca_nome.toLowerCase());
            
            const match_datas = (autor.nascimento <= ano_fim && autor.morte >= ano_inicio);

            return match_nome && match_datas
        }).sort((a, b) => {
            switch(ordenar_por) {
                case "nome-crescente":
                    return `${a.nome} ${a.sobrenome}`.localeCompare(`${b.nome} ${b.sobrenome}`);
                case "nome-decrescente":
                    return `${b.nome} ${b.sobrenome}`.localeCompare(`${a.nome} ${a.sobrenome}`);
                case "sobrenome-crescente":
                    return a.sobrenome.localeCompare(b.sobrenome);
                case "sobrenome-decrescente":
                    return b.sobrenome.localeCompare(a.sobrenome);
                case "nascimento-crescente":
                    return a.nascimento - b.nascimento;
                case "nascimento-decrescente":
                    return b.nascimento - a.nascimento;
                case "morte-crescente":
                    return a.morte - b.morte;
                case "morte-decrescente":
                    return b.morte - a.morte;
                default:
                    return 0;
            }
        })
    );

    function limparFiltros() {
        busca_nome = "";
        ano_inicio = data.primeiro_nascimento;
        ano_fim = data.ultima_morte;
        ordenar_por = "nome-crescente";
    }

    function getSVGPerfil(gender: string) {
    switch(gender) {
      case 'masculino': return PerfilMasculino;
      case 'feminino': return PerfilFeminino;
      default: return PerfilDesconhecido;
    }
  }

</script>

<svelte:head>
  <title>Autores - Literatura em Língua Alemã</title>
</svelte:head>

<!-- Breadcrumb -->
<nav class="relative w-full bg-cream border-b border-beige">
  <div class="mx-auto max-w-7xl px-6 py-3">
    <ol class="flex items-center gap-2 text-sm text-brown-mid">
      <li><a href={resolve("/")} class="hover:text-brown-dark transition-colors">Início</a></li>
      <li><span class="text-brown-mid">/</span></li>
      <li class="text-brown-dark font-medium">Autores</li>
    </ol>
  </div>
</nav>

<!-- Header -->
<header class="bg-cream relative overflow-hidden w-full">
    <div 
    class="absolute inset-0 bg-[url('/autores-header.png')] bg-cover bg-center"
    ></div>
    <div class="absolute inset-0 bg-cream/70 pointer-events-none"></div>

    <div class="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div class="max-w-2xl">
            <h1 class="font-serif text-4xl md:text-5xl font-bold text-brown-dark mb-4">
                Autores
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
                Escritores de língua alemã cujas obras circularam, foram traduzidas ou 
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
        <div class="bg-beige/40 border border-beige rounded-sm p-6 sticky top-8">
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
            style="left: {0.1+((ano_inicio - data.primeiro_nascimento) / (data.ultima_morte-data.primeiro_nascimento)) * 100}%; width: {((ano_fim - ano_inicio) / (data.ultima_morte-data.primeiro_nascimento)) * 100}%"
            ></div>
            
            <!-- Min Handle -->
            <input 
            name="data-inicio"
            type="range" 
            min={data.primeiro_nascimento} 
            max={data.ultima_morte}  
            step="1"
            bind:value={ano_inicio}
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
            min={data.primeiro_nascimento} 
            max={data.ultima_morte} 
            step="1"
            bind:value={ano_fim}
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
                bind:value={ano_inicio}
                min={data.primeiro_nascimento}
                max={ano_fim}
                class="w-full px-3 py-2 border border-beige rounded-sm bg-cream text-brown-dark text-sm text-center focus:outline-none focus:border-brown-warm transition-colors"
            />
            </div>
            <div class="relative flex-1">
            <input
                type="number"
                bind:value={ano_fim}
                min={ano_inicio}
                max={data.ultima_morte}
                class="w-full px-3 py-2 border border-beige rounded-sm bg-cream text-brown-dark text-sm text-center focus:outline-none focus:border-brown-warm transition-colors"
            />
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

      <!-- Authors Grid -->
      <div class="flex-1">
        <!-- Results count and view toggle -->
        <div class="flex items-center justify-between mb-6">
          <p class="text-brown-dark font-serif text-lg">
            {autores_filtrados.length} {#if autores_filtrados.length > 1}autores encontrados{:else}autor encontrado{/if}
          </p>
          <!-- <div class="flex items-center gap-2">
            <button class="p-2 rounded-sm bg-brown-dark text-cream">
              <Grid3x3 class="w-4 h-4" />
            </button>
            <button class="p-2 rounded-sm border border-beige text-brown-mid hover:text-brown-dark">
              <List class="w-4 h-4" />
            </button>
          </div> -->
        </div>

        <!-- Authors Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {#each autores_filtrados as autor}
            <article class="bg-cream border border-beige rounded-sm p-4 hover:shadow-lg transition-shadow group">
              <a href="{resolve("/autores")}/{autor.url_simples}">
                <!-- Profile Image -->
                <div class="mb-4 overflow-hidden rounded-sm bg-beige aspect-4/5">
                    {@html getSVGPerfil("desconhecido")}
                </div>
                
                <!-- Author Info -->
                <h3 class="font-serif text-lg text-center font-semibold text-brown-dark mb-1 group-hover:text-brown-warm transition-colors">
                    {autor.nome} {autor.sobrenome}
                </h3>
                <p class="text-sm text-center text-brown-mid mb-3">
                    ({autor.nascimento}–{autor.morte})
                </p>
                <p class="text-sm text-brown-mid mb-4 line-clamp-2">
                    <!-- {autor.descricao} -->
                    Sem descrição
                </p>
                
                <!-- Works count -->
                <div class="inline-flex items-center px-3 py-1 border border-beige rounded-sm text-xs text-brown-mid">
                    {autor.num_obras} obras catalogadas
                </div>
              </a>
            </article>
          {/each}
        </div>

        <!-- Empty state -->
        {#if autores_filtrados.length === 0}
          <div class="text-center py-16">
            <p class="text-brown-mid text-lg">Nenhum autor encontrado com os filtros selecionados.</p>
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