<script lang="ts">
	let { category } = $props();
</script>

<div class="badge badge-sm border-0 text-black" style="background-color: {category.color}">
	{category.name}
</div>
