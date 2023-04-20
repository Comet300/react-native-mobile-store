const dummyProducts = [
	{
		title: "Magnific soap",
		subtitle: "Leaves skin out of this world smooth",
		price: "5",
		image: require("./../assets/icons/soap.png"),
		id: "1",
		currency: {
			Name: "EUR",
		},
	},
	{
		title: "Trusty razor",
		subtitle: "Man's second best friend",
		price: "15",
		image: require("./../assets/icons/razor.png"),
		id: "2",
		currency: {
			Name: "EUR",
		},
	},
	{
		title: "Silky Shampoo",
		subtitle: "Makes sure you slay everytime you go out",
		price: "12",
		image: require("./../assets/icons/shampoo.png"),
		id: "3",
		currency: {
			Name: "EUR",
		},
	},
	{
		title: "Godly Perfume",
		subtitle: "Smell fresh as a lemon and sweet like vanilla",
		price: "75",
		image: require("./../assets/icons/perfume.png"),
		id: "4",
		currency: {
			Name: "EUR",
		},
	},
	{
		title: "Colorful makeup",
		subtitle: "Shine bright everyday in your favourite colors",
		price: "75",
		image: require("./../assets/icons/make-up.png"),
		id: "5",
		currency: {
			Name: "EUR",
		},
	},
	{
		title: "Soft care cream",
		subtitle: "Keep your face smooth and kissalbe with ease",
		price: "6",
		image: require("./../assets/icons/cream.png"),
		id: "6",
		currency: {
			Name: "EUR",
		},
	},
	{
		title: "Awesome hair wax",
		subtitle: "Keep your curls in their best shape",
		price: "8",
		image: require("./../assets/icons/hair-gel.png"),
		id: "7",
		currency: {
			Name: "EUR",
		},
	},
];

export default (productCount) => {
	const shuffled = dummyProducts.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, productCount);
};
