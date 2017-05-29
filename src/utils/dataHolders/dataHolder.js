export default class Data {
	static get(request) {
		return request
			.send()
			.then((data) => data
			)
			.catch((error) => {
				console.error(error);
			});
	}

	static format(data) {
		try {
			let formattedData = JSON.parse(data);
			if (!formattedData.hasOwnProperty('rows'))
				throw new Error();
			else return formattedData;
		} catch (error) {
			return undefined;
		}
	}
}
