<script lang="ts">
	export let title: string;
	export let description: string;
	export let imageUrl: string;
	export let aligned: 'left' | 'right' = 'left';
    export let alt: string;
</script>

<div class="hero bg-base-200">
	<div
		class="hero-content flex-col gap-7 {aligned === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'}"
	>
		<img src={imageUrl} class="rounded-lg shadow-2xl" alt={alt} />
		<div>
			<h1 class="text-xl font-bold">{title}</h1>
			<p class="py-6">
				{description}
			</p>
		</div>
	</div>
</div>
