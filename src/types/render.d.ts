import { ComponentOptions } from "vue";

declare interface Options extends ComponentOptions {
	name: string;

	options?:
		| Array<{
				label: string;
				value?: any;
				[key: string]: any;
		  }>
		| Function;

	props?: any;
}

export declare type RenderOptions = Options | Function;
