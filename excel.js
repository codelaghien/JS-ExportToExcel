let myData = [];

function getData() {
	$.ajax({
		url: 'https://randomuser.me/api/?results=10',
		dataType: 'json',
		success: function (data) {
			console.log('getData', data.results);
			showData(data.results);
		},
	});
}

function showData(data) {
	// console.log(data);
	myData = data.map((d) => {
		return {
			firstName: d?.name?.first,
			lastName: d?.name?.last,
			email: d?.email,
			phone: d?.phone,
			income: `$` + (Math.random() * 1000).toFixed(2),
		};
	});
	console.log('myData', myData);
	let html =
		'<tr><td>Tên</td><td>Họ</td><td>Email</td><td>Phone</td><td>Income</td></tr>';
	$.each(myData, function (key, value) {
		html += '<tr>';
		html += '<td>' + value?.firstName + '</td>';
		html += '<td>' + value?.lastName + '</td>';
		html += '<td>' + value?.email + '</td>';
		html += '<td>' + value?.phone + '</td>';
		html += '<td>' + value?.income + '</td>';
		html += '</tr>';
	});
	// console.log('html', html);
	$('table tbody').html(html);
}

function exportToExcel(fileName, sheetName, table) {
	if (myData.length === 0) {
		console.error('Chưa có data');
		return;
	}
	console.log('exportToExcel', myData);

	let wb;
	if (table && table !== '') {
		wb = XLSX.utils.table_to_book($('#' + table)[0]);
	} else {
		const ws = XLSX.utils.json_to_sheet(myData);
		// console.log('ws', ws);
		wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, sheetName);
	}
	console.log('wb', wb);
	XLSX.writeFile(wb, `${fileName}.xlsx`);
}
