/* Function to convert a given query string to a JSON object */
function parseQString(str) {
	//Separating different fields from the string
	let qArr = str.split("|");
	console.log(qArr);

	//Parsing name field
	const re = /<(\w*)>/g;
	let m;
	let nameArr = [];
	while ((m = re.exec(qArr[2]))) {
		nameArr.push(m[1]);
	}

	//Parsing location and coords field
	const re2 = /<+([\w.]*)>+/g;
	let m2;
	let locArr = [];
	while ((m2 = re2.exec(qArr[4]))) {
		locArr.push(m2[1]);
	}

	//Saving above parsed query string as a JS object
	let obj = {
		id: qArr[1],
		name: {
			first: nameArr[0],
			middle: nameArr[1],
			last: nameArr[2]
		},
		dob: qArr[3],
		location: {
			name: locArr[0],
			coords: {
				long: locArr[1],
				lat: locArr[2]
			}
		},
		imageId: qArr[5]
	};
	
	return obj;
}

//JS for webpage
let input = document.getElementById("input");
let submit = document.getElementById("submit");

submit.addEventListener("click", e => {
	let obj = parseQString(input.value);
	let ans = document.querySelector(".answer");
	ans.innerHTML = `<code>${JSON.stringify(obj)}</code>`;
});