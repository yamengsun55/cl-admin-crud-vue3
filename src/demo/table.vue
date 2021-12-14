<template>
	<div class="demo-table">
		<cl-table :ref="setRefs('table')" :columns="columns" :auto-height="false">
			<template #slot-op="{ scope }">
				<el-button type="text" size="mini" @click="toEdit(scope.row)">编辑2</el-button>
			</template>
		</cl-table>
	</div>

	<cl-form :ref="setRefs('form')"></cl-form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { TableColumn } from "@/types";
import Test2 from "./render/test2";
import { useRefs } from "@/hooks";

export default defineComponent({
	setup() {
		const { refs, setRefs }: any = useRefs();

		const columns = ref<TableColumn[]>([
			{
				type: "selection",
				width: 60
			},
			{
				label: "姓名",
				prop: "name",
				minWidth: 120,
				sortable: true,
				component: Test2
			},
			{
				label: "存款",
				prop: "price",
				minWidth: 120
			},
			{
				label: "状态",
				prop: "status",
				minWidth: 120,
				dict: [
					{
						label: "启用",
						value: 1,
						type: "success"
					},
					{
						label: "禁用",
						value: 0,
						type: "danger"
					}
				]
			},
			{
				label: "创建时间",
				prop: "createTime",
				minWidth: 150
			},
			{
				label: "操作",
				type: "op",
				buttons: ["edit", "delete", "slot-op"]
			}
		]);

		function toEdit(item: any) {
			refs.value.form.open({
				items: [
					{
						label: "姓名",
						prop: "name",
						value: item.name,
						component: {
							name: "el-input"
						}
					}
				]
			});
		}

		return {
			refs,
			setRefs,
			columns,
			toEdit
		};
	}
});
</script>

<style lang="scss" scoped>
.demo-table {
	width: 100%;
}
</style>
