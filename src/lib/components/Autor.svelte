<script lang="ts">
    let { autor } = $props();
</script>

<div class="flex flex-row gap-4 w-full bg-yellow-50 hover:bg-yellow-100 p-2">
    <div class="flex flex-col gap-2 w-4/7">
        <span class="h-1/2 w-full text-lg">
            {autor.nome} <b>{autor.sobrenome}</b>
        </span>
        <span class="h-1/2 w-full">
            Nascimento: {autor.nascimento} - Morte: {autor.morte}
        </span>
    </div>
    <div class="flex flex-col gap-2 w-2/7">
        <span class="w-full">
            Obras cadastradas: <b>{autor.num_obras}</b>
        </span>
    </div>
    <div class="flex w-1/7 items-center right-0">
        <a class="block flex-none w-20 h-7 rounded-sm bg-yellow-200 text-center" href="/autores/{autor.url_simples}">Ver mais</a>
    </div>    
</div>