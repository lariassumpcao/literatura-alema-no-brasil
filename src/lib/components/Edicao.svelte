<script lang="ts">
    let { edicao } = $props();
</script>

<div class="flex flex-row gap-4 rounded-lg bg-yellow-50 hover:bg-yellow-100 p-2">
    <div class="flex w-4/6 items-center text-left">
        <span class="">{edicao.nome}</span>
    </div>

    <div class="flex flex-col gap-y-2 w-1/6 items-center text-center">
        <span class="">{edicao.publicacao}</span>
    </div>

    <div class="flex flex-col gap-y-2 w-1/6 items-center">
    {#each edicao.volumes as volume}
        <div class="flex flex-row gap-2">
            <span class="">{volume.titulo}</span>
            {#each volume.locais as local}
                <a class="block w-6 h-6 {local.local}" href="{local.url}" title=""></a>
            {/each}
        </div>
    {/each}
    </div>
</div>

<style>
    .google-books {
        background: no-repeat center url("$lib/assets/Google_G_logo.svg");
        background-size: cover;
    }

    .hathitrust {
        background: no-repeat center url("$lib/assets/HathiTrust_logo_2023.svg");
        background-size: cover;
    }
</style>