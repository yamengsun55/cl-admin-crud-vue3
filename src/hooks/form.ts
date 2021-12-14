import { isArray, isFunction, isObject, isString } from "../utils";

export const format: any = {
	number(value: any) {
		return isArray(value) ? value.map(Number) : Number(value);
	},
	string(value: any) {
		return isArray(value) ? value.map(String) : String(value);
	},
	split(value: string) {
		return isString(value) ? value.split(",").filter(Boolean) : value;
	},
	join(value: any[]) {
		return isArray(value) ? value.join(",") : value;
	},
	boolean(value: any) {
		return Boolean(value);
	},
	booleanNumber(value: any) {
		return value ? 1 : 0;
	},
	datetimerange(value: any[], form: any, method: string) {
		if (method == "bind") {
			return [form.startTime, form.endTime];
		} else {
			const [startTime, endTime] = value || [];
			form.startTime = startTime;
			form.endTime = endTime;
			return undefined;
		}
	},
	splitJoin(value: any, _: any, method: string) {
		if (method == "bind") {
			return isString(value) ? value.split(",").filter(Boolean) : value;
		} else {
			return isArray(value) ? value.join(",") : value;
		}
	}
};

function parse(method: string, { value, pipe, form }: any) {
	if (!pipe) {
		return value;
	}

	let pipes = [];

	if (isString(pipe)) {
		if (format[pipe]) {
			pipes = [pipe];
		} else {
			console.error(`${pipe} is not found.`);
			return value;
		}
	} else if (isArray(pipe)) {
		pipes = pipe;
	} else if (isObject(pipe)) {
		pipes = isArray(pipe[method]) ? pipe[method] : [pipe[method]];
	} else if (isFunction(pipe)) {
		pipes = [pipe];
	} else {
		console.error(`Hook data error!`);
		return value;
	}

	let d = value;

	pipes.forEach((e: any) => {
		if (isString(e)) {
			d = format[e](d, form, method);
		} else if (isFunction(e)) {
			d = e(d, form);
		}
	});

	return d;
}

export default {
	bind(value: any, pipe: any, form: any) {
		return parse("bind", { value, pipe, form });
	},

	submit(value: any, pipe: any, form: any) {
		return parse("submit", { value, pipe, form });
	}
};
