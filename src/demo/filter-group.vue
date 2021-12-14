<template>
	<div>
		<cl-filter-group v-model="form">
			<cl-filter label="xxx">
				<el-input v-model="form.name" size="mini"></el-input>
			</cl-filter>
		</cl-filter-group>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
	setup() {
		const form = reactive<any>({
			name: "xxx"
		});

		return {
			form
		};
	}
});
</script>
