<script lang="ts">
    let { obra } = $props();
</script>

<div class="flex flex-row gap-4 w-full bg-yellow-50 hover:bg-yellow-100 p-2">
    <div class="flex flex-col gap-2 w-4/7">
        <span class="h-1/2 w-full text-lg font-bold">
            {obra.nome}
        </span>
        <span class="h-1/2 w-full">
            {#if "autor" in obra}{@html obra.autor}{/if}
        </span>
    </div>
    <div class="flex flex-col gap-2 w-2/7">
        <span class="h-1/2 w-full">
            Publicado em {obra.publicacao}
        </span>
        <span class="h-1/2 w-full">
            {#if obra.edicoes.length > 0}
                Edições disponíveis: {obra.edicoes.length}
            {:else}
                Não há edições disponíveis
            {/if}
        </span>
    </div>
    <div class="flex w-1/7 items-center right-0">
        <a class="block flex-none w-20 h-7 rounded-sm bg-yellow-200 text-center" href="/obras/{obra.url_simples}">Ver mais</a>
    </div>    
</div>