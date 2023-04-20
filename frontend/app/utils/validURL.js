export default (str) => {
	var pattern = new RegExp(
		"^(https?:\\/\\/)?" + // protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domeniu
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // sau IPV4
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port si endpoint
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
			"(\\#[-a-z\\d_]*)?$",
		"i"
	);
	return !!pattern.test(str); //cast to bool
};
