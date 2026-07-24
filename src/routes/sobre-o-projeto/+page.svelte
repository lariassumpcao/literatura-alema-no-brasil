 <svelte:head>
  <title>Sobre o Projeto - Literatura em Língua Alemã</title>
</svelte:head>

<!-- Breadcrumb -->
<!-- <nav class="relative w-full bg-cream border-b border-beige">
  <div class="mx-auto max-w-7xl px-6 py-3">
    <ol class="flex items-center gap-2 text-sm text-brown-mid">
      <li><a href={resolve("/")} class="hover:text-brown-dark transition-colors">Início</a></li>
      <li><span class="text-brown-mid">/</span></li>
      <li class="text-brown-dark font-medium">Sobre o Projeto</li>
    </ol>
  </div>
</nav> -->

<script>
  import { resolve } from '$app/paths';
</script>

<!-- Import Google Fonts for the specific look -->
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
  
  .font-serif-display {
    font-family: 'Playfair Display', serif;
  }
  .font-sans-body {
    font-family: 'Inter', sans-serif;
  }
</style>

<div class="min-h-screen bg-cream text-stone-800 font-sans-body flex flex-col w-full">

  <!-- HERO SECTION -->
  <section class="relative bg-cream overflow-hidden border-b border-stone-200">
    <!-- Background Image Simulation (Old Map) -->
     <!-- https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80 -->
    <div class="absolute inset-0 opacity-15 pointer-events-none">
      <!-- Fonte da imagem: https://objdigital.bn.br/objdigital2/acervo_digital/div_cartografia/cart354236/cart354236.htm -->
      <img src={resolve("/sobre-o-projeto-header.png")} alt="Old Map" class="w-full h-full object-cover grayscale sepia-[.3]" />
    </div>
    
    <!-- Decorative Book Page Simulation -->
    <!-- <div class="absolute top-10 right-1/4 w-64 h-80 bg-cream shadow-xl rotate-3 border border-stone-300 hidden lg:block opacity-80 p-8 flex flex-col items-center justify-center text-center">
       <div class="font-serif-display text-sm mb-4">EMILIO NO MUNDO.</div>
       <div class="text-[10px] mb-8">POR<br>AUGUSTO LAFONTAINE.</div>
       <div class="text-[10px] mb-2">TRADUZIDO EM<br>PORTUGUEZ<br>POR<br>A. V. de C. S.</div>
       <div class="text-[10px] mt-8">TOMO IV.</div>
       <div class="text-[10px] mt-12">LISBOA,<br>NA TYPOGRAPHIA ROLLANDIANA.<br>1852.</div>
    </div> -->
    <img src={resolve("/sobre-o-projeto-livro.jpeg")} alt="" class="absolute top-4 right-1/12 w-86 h-130 bg-cream shadow-xl rotate-3 border border-stone-300 hidden lg:block opacity-60 p-2 flex flex-col items-center justify-center text-center"/>

    <div class="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
      <div class="text-xs text-stone-500 mb-6 flex items-center gap-2">
        <a href={resolve("/")} class="hover:text-stone-900">Início</a>
        <span>/</span>
        <span class="text-stone-900 font-medium">Sobre o projeto</span>
      </div>
      
      <h1 class="font-serif-display text-5xl lg:text-7xl text-stone-900 mb-6">Sobre o projeto</h1>
      
      <div class="flex items-center gap-4 mb-8">
        <div class="h-px w-16 bg-stone-400"></div>
        <svg class="w-4 h-4 text-stone-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
        <div class="h-px w-16 bg-stone-400"></div>
      </div>

      <p class="font-serif-display text-xl lg:text-2xl text-stone-800 max-w-lg leading-relaxed">
        Mapeando a circulação de obras fictícias de expressão alemã entre Europa e Brasil no século XIX.
      </p>
    </div>
  </section>

  <!-- MAIN CONTENT -->
  <main class="max-w-7xl mx-auto px-6 py-20 grow">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
      
      <!-- Left Column: Text -->
      <div class="lg:col-span-7 space-y-6 text-stone-700 leading-relaxed text-lg">
        <p>
          Ao longo do século XIX, centenas de obras ficcionais de expressão alemã chegaram ao Brasil, onde passaram a ser disponibilizadas ao público leitor em língua original ou por meio de traduções para o português. Este repositório contém a listagem de alguns desses livros, recuperados a partir de catálogos de bibliotecas, de catálogos de livreiros e de anúncios em periódicos.
        </p>
        <p>
          Todas essas informações foram coletados pela pesquisadora Larissa de Assumpção no âmbito do projeto de pós-doutorado "A circulação de obras ficcionais de expressão alemã no Rio de Janeiro do século XIX", que contou com financiamento da Fundação de Amparo à Pesquisa do Estado de São Paulo (Fapesp, processo nº 2023/07967-6) e foi desenvolvido no Departamento de Letras Modernas da Universidade de São Paulo entre 2023 e 2026.
        </p>
        <p>
          Todos os dados dispostos neste site são de livre acesso. Obras em domínio público que foram digitalizadas ao longo da pesquisa também foram disponibilizadas para download sempre que possível.
        </p>
      </div>

      <!-- Right Column: Info Card -->
      <div class="lg:col-span-5">
        <div class="bg-beige border border-stone-200 rounded-sm p-8 shadow-sm">
          <h3 class="text-sm font-bold tracking-wider text-stone-900 uppercase mb-6 border-b border-stone-300 pb-2">Informações do Projeto</h3>
          
          <div class="space-y-6">
            <!-- Item 1 -->
            <div class="flex gap-4">
              <div class="mt-1 text-stone-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <div>
                <div class="text-sm font-semibold text-stone-900">Pesquisadora responsável</div>
                <div class="text-sm text-stone-600 mt-1">Larissa de Assumpção</div>
              </div>
            </div>

            <!-- Item 2 -->
            <div class="flex gap-4">
              <div class="mt-1 text-stone-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <div>
                <div class="text-sm font-semibold text-stone-900">Instituição</div>
                <div class="text-sm text-stone-600 mt-1">Universidade de São Paulo<br>Departamento de Letras Modernas</div>
              </div>
            </div>

            <!-- Item 3 -->
            <div class="flex gap-4">
              <div class="mt-1 text-stone-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <div class="text-sm font-semibold text-stone-900">Período de desenvolvimento</div>
                <div class="text-sm text-stone-600 mt-1">2023 – 2026</div>
              </div>
            </div>

            <!-- Item 4 -->
            <div class="flex gap-4">
              <div class="mt-1 text-stone-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <!-- Using clock icon as placeholder for funding/award -->
                <svg class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
              </div>
              <div>
                <div class="text-sm font-semibold text-stone-900">Financiamento</div>
                <div class="text-sm text-stone-600 mt-1">FAPESP<br>Processo nº 2023/07967-6</div>
              </div>
            </div>

            <!-- Item 5 -->
            <div class="flex gap-4">
              <div class="mt-1 text-stone-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
              </div>
              <div>
                <div class="text-sm font-semibold text-stone-900">Natureza do projeto</div>
                <div class="text-sm text-stone-600 mt-1">Pós-doutorado</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DATA SOURCES SECTION -->
    <div class="mt-24">
      <div class="flex items-center gap-4 mb-10">
        <h2 class="text-sm font-bold tracking-wider text-stone-900 uppercase">Fontes de Dados</h2>
        <div class="h-px grow bg-stone-300"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        <!-- Source 1 -->
        <div class="flex gap-4">
          <div class="text-stone-500 shrink-0">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <div>
            <h3 class="font-semibold text-stone-900 mb-2">Catálogos de bibliotecas</h3>
            <p class="text-sm text-stone-600 leading-relaxed">Levantamentos em catálogos manuscritos e impressos de bibliotecas públicas e privadas do século XIX.</p>
          </div>
        </div>

        <!-- Source 2 -->
        <div class="flex gap-4 md:border-l md:border-stone-200 md:pl-8">
          <div class="text-stone-500 shrink-0">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          </div>
          <div>
            <h3 class="font-semibold text-stone-900 mb-2">Catálogos de livreiros</h3>
            <p class="text-sm text-stone-600 leading-relaxed">Catálogos comerciais de livreiros atuantes no Rio de Janeiro e outras cidades brasileiras.</p>
          </div>
        </div>

        <!-- Source 3 -->
        <div class="flex gap-4 md:border-l md:border-stone-200 md:pl-8">
          <div class="text-stone-500 shrink-0">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
          </div>
          <div>
            <h3 class="font-semibold text-stone-900 mb-2">Anúncios em periódicos</h3>
            <p class="text-sm text-stone-600 leading-relaxed">Anúncios de livros publicados em jornais e revistas entre 1800 e 1900.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA SECTION -->
    <div class="mt-12 bg-beige rounded-sm overflow-hidden flex flex-col w-full md:flex-row">
      <div class="p-12 lg:p-16 md:w-1/2 flex flex-col justify-center">
        <div class="flex items-center gap-4 mb-6">
          <div class="border border-stone-400 p-2 rounded-sm">
            <svg class="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          </div>
          <h3 class="font-bold text-stone-900 text-lg">Acesso livre e aberto</h3>
        </div>
        <p class="text-stone-700 mb-8 leading-relaxed">
          Navegue, explore e utilize os dados deste repositório livremente para fins de pesquisa, ensino e difusão do conhecimento.
        </p>
        <div>
          <a href={resolve("/obras")} class="inline-flex items-center gap-2 bg-brown-mid hover:bg-brown-warm text-white px-6 py-3 rounded-sm text-sm font-medium transition-colors">
            Explorar a coleção
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </a>
        </div>
      </div>
      <div class="md:w-1/2 relative min-h-75">
        <!-- https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80 -->
        <!-- Fonte da imagem: https://unsplash.com/photos/stack-of-six-brown-hardbound-books-9T346Ij4kGk -->
        <img src={resolve("/chris-lawton-9T346Ij4kGk-unsplash.jpg")} alt="Livros antigos em uma mesa de madeira. Foto por Chris Lawton obtida no site Unsplash." class="absolute inset-0 w-full h-full object-cover grayscale opacity-80 sepia-[.3]" />
        <div class="absolute inset-0 bg-linear-to-r from-[#f4f1ea] to-transparent md:w-1/3"></div>
      </div>
    </div>

  </main>

</div>