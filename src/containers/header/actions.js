const UPDATE_DATE = 'UPDATE_DATE';

function updateDate(date) {
	return {
		type: UPDATE_DATE,
		date
	}
}


export {
	UPDATE_DATE,
	updateDate
}
