<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import "$lib/shared.css";
	import { resolve } from '$app/paths';

    const navLinks = [
        {"label": "Catálogo", "href": "/obras"},
        {"label": "Autores", "href": "/autores"},
		{"label": "Sobre o projeto", "href": "/sobre-o-projeto"},
    ];

	let { children } = $props();

	const livro_aberto = `
		<svg class="w-10 h-10 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
	`;
</script>

<div class="flex w-full justify-center bg-offwhite">
	<div class="flex flex-col items-center w-180 lg:w-360">
		<!-- <nav class="flex flex-row h-10 justify-center gap-8 mb-4">
			<a class="h-10 justify-center" href={resolve("/")}>Início</a>
			<a class="" href={resolve("/autores")}>Lista de autores</a>
			<a class="" href={resolve("/obras")}>Lista de obras</a>
		</nav> -->

		<nav class="relative z-20 border-b border-beige bg-cream w-full">
			<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 h-20">
				<!-- Logo -->
				<a href={resolve("/")}>
					<div class="flex items-center gap-3">
						<!-- <BookOpen class="h-7 w-7 text-brown-dark" stroke-width={1.5} /> -->
						{@html livro_aberto}
						<div class="leading-tight">
							<p class="font-serif text-[16px] font-semibold uppercase tracking-wider text-brown-dark">
							Literatura de Língua Alemã
							</p>
							<p class="text-[14px] uppercase tracking-wider text-brown-mid">
							no Brasil, Oitocentista
							</p>
						</div>
					</div>
				</a>

				<!-- Nav Links -->
				<ul class="flex items-center gap-6">
				{#each navLinks as link}
					<li>
					<a
						href={resolve(link.href)}
						class="text-[18px] text-brown-mid transition-colors hover:text-brown-dark"
					>
						{link.label}
					</a>
					</li>
				{/each}
				</ul>

				<!-- Search -->
				<!-- <button class="text-brown-mid transition-colors hover:text-brown-dark">
				<Search class="h-5 w-5" stroke-width={1.5} />
				</button> -->
				<div></div>
			</div>
		</nav>

		{@render children()}

		<!-- FOOTER -->
		<footer class="bg-brown-dark text-stone-300 pt-12 pb-4 mt-auto w-full">
			<div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
				<!-- Logo -->
				<a href={resolve("/")}>
					<div class="flex items-center gap-3">
						<svg class="w-8 h-8 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
						<div class="text-xs font-semibold tracking-wider leading-tight uppercase">
						Literatura de<br>Língua Alemã<br>no Brasil Oitocentista
						</div>
					</div>
				</a>

				<!-- Nav -->
				<nav class="flex flex-wrap justify-center gap-6 text-sm">
					{#each navLinks as link}
						<a
							href={resolve(link.href)}
							class="hover:text-white transition-colors"
						>
							{link.label}
						</a>
					{/each}
				</nav>

				<!-- Social -->
				<div class="flex gap-4">
					<a href="https://www.instagram.com/literaturaalema/" class="hover:text-white transition-colors" title="Instagram" target="_blank">
					<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
					</a>
					<a href="mailto:projeto.literatura.alema@gmail.com" class="hover:text-white transition-colors" title="E-Mail" target="_blank">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
					</a>
				</div>
			</div>
			<div class="mx-auto max-w-7xl px-6 text-xs text-center align-bottom mt-8">
				<p>
				Literatura de Língua Alemã no Brasil Oitocentista — Projeto de
				Humanidades Digitais
				</p>
			</div>
		</footer>

	</div>
</div>