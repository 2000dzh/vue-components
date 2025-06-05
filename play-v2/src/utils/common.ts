/**
 * @param { Promise } promise
 * @param { Object } errorExt - 传递给 err 对象的额外信息
 * @return { Promise }
 */
export function to<T>(promise: Promise<T>, errorExt: Record<string, any>) {
	return promise
		.then((data) => [null, data])
		.catch((err) => {
			if (errorExt) {
				const parsedError = Object.assign({}, err, errorExt);
				return [parsedError, undefined];
			}
			return [err, undefined];
		});
}
