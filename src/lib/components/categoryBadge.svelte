<script lang="ts">
	let { category } = $props();
</script>

<div class="badge badge-sm border-0" style="background-color: {category.color}">
	{category.name}
</div>
