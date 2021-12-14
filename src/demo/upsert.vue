<template>
	<div class="demo-upsert">
		<el-select multiple v-model="a">
			<el-option
				v-for="(item, index) in list"
				:key="index"
				:label="item.label"
				:value="item.value"
			></el-option>
		</el-select>

		<cl-upsert
			ref="upsertRef"
			:dialog="dialog"
			:items="items"
			:op="op"
			@opened="opened"
			:on-open="onOpen"
		>
			<template #slot-on>
				<test />
			</template>

			<template #slot-inject="{ isEdit }">
				<p v-if="isEdit">12323</p>
			</template>

			<template #slot-next>
				<el-button size="small" @click="onNext">Next</el-button>
			</template>
		</cl-upsert>
	</div>
</template>

<script lang="ts">
import { UpsertItem, UpsertRef } from "@/types";
import { defineComponent, reactive, ref } from "vue";
import Test from "./render/test.vue";

export default defineComponent({
	components: {
		Test
	},

	setup() {
		const upsertRef = ref<UpsertRef>();

		const dialog = reactive<any>({});

		const list = ref<any[]>([]);

		const a = ref([1]);

		setTimeout(() => {
			list.value = [
				{
					label: "景天",
					value: 1
				},
				{
					label: "李逍遥",
					value: 2
				},
				{
					label: "宇文拓",
					value: 3
				}
			];
		}, 3000);

		const items = ref<Array<UpsertItem>>([
			{
				label: "测试props",
				prop: "pf",
				component: {
					name: "el-input",
					props({ isEdit }: any) {
						return {
							disabled: isEdit,
							onChange(val: string) {
								console.log(val);
							}
						};
					}
				}
			},
			{
				label: "测试inject",
				prop: "inject",
				value: {
					list: ["2", "2"]
				},
				component: {
					name: "slot-inject"
				}
			},
			{
				label: "测试多级对象",
				prop: "user.a.name",
				value: "神仙",
				component: {
					name: "slot-on"
				}
			},
			{
				label: "测试hook",
				prop: "hook",
				hook: {
					bind: ["split", "number"],
					submit: "join"
				},
				component: {
					name: "el-select",
					props: {
						multiple: true
					},
					options: list.value
				}
			},
			{
				type: "tabs",
				value: "base",
				props: {
					labels: [
						{
							label: "基本信息",
							value: "base"
						},
						{
							label: "金融",
							value: "financial"
						},
						{
							label: "工作",
							value: "work"
						}
					]
				}
			},
			{
				label: {
					text: "姓名",
					icon: "el-icon-question",
					tip: "姓名是汉语词语，拼音是 xìng míng ，意思是由姓和名组成"
				},
				prop: "name",
				group: "base",
				collapse: false,
				component: {
					name: "el-input"
				},
				rules: {
					required: true,
					message: "姓名不能为空"
				}
			},
			{
				label: "存款",
				prop: "price",
				value: 0,
				group: "financial",
				component: {
					name: "el-input-number"
				},
				append({ h }: any) {
					return h("p", "元");
				},
				rules: {
					required: true,
					message: "存款不能为空"
				}
			},
			{
				label: "公司",
				prop: "company",
				value: "cool",
				group: "work",
				component: {
					name: "el-input"
				}
			},
			{
				label: "状态",
				prop: "status",
				value: 1,
				component: {
					name: "el-radio-group",
					options: [
						{
							label: "启用",
							value: 1
						},
						{
							label: "禁用",
							value: 0
						}
					],
					props: {
						onChange(v: any) {
							upsertRef.value?.toggleItem("remark", v == 1);
						}
					}
				}
			},
			{
				label: "备注",
				prop: "remark",
				component: {
					name: "el-input"
				}
			}
		]);

		const op = reactive<any>({
			buttons: ["close", "save", "slot-next"]
		});

		function opened(isEdit: boolean) {
			console.log(isEdit);
		}

		function onOpen(isEdit: boolean) {
			console.log(isEdit);
			upsertRef.value?.setTitle(isEdit ? "edit" : "add");
		}

		function onNext() {
			upsertRef.value?.changeTab("work").catch((err) => {
				console.error(err);
			});
		}

		return {
			a,
			list,
			items,
			op,
			upsertRef,
			opened,
			onOpen,
			onNext,
			dialog
		};
	}
});
</script>

<style lang="scss" scoped>
.demo-upsert {
}
</style>
