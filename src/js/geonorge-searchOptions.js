var defaultSearchPlaceholder = "Søk etter kartdata";
if (cultureData.currentCulture !== undefined && cultureData.currentCulture == "en") {
	defaultSearchPlaceholder = "Search for map data";
}

var searchOptionsArray =
{
	"dev" : {
		text: "Kartkatalogen",
		searchTitle: "Kartkatalogen",
		searchPlaceholder: defaultSearchPlaceholder,
		buttonCss: "edgesKartkatalogen",
		listCss: "left-edge-kartkatalogen",
		baseUrl: "//kartkatalog.dev.geonorge.no",
		url: "//kartkatalog.dev.geonorge.no/search",
		api: "//kartkatalog.dev.geonorge.no/api/search",
		queryParameter: '?text=',
		localUrl: false,
		autoComplete: true,
		geonorgeUrl: "//www.test.geonorge.no"
	},
	"test" : {
		text: "Kartkatalogen",
		searchTitle: "Kartkatalogen",
		searchPlaceholder: defaultSearchPlaceholder,
		buttonCss: "edgesKartkatalogen",
		listCss: "left-edge-kartkatalogen",
		baseUrl: "//kartkatalog.test.geonorge.no",
		url: "//kartkatalog.test.geonorge.no/search",
		api: "//kartkatalog.test.geonorge.no/api/search",
		queryParameter: '?text=',
		localUrl: false,
		autoComplete: true,
		geonorgeUrl: "//www.test.geonorge.no"
	},
	"prod" : {
		text: "Kartkatalogen",
		searchTitle: "Kartkatalogen",
		searchPlaceholder: defaultSearchPlaceholder,
		buttonCss: "edgesKartkatalogen",
		listCss: "left-edge-kartkatalogen",
		baseUrl: "//kartkatalog.geonorge.no",
		url: "//kartkatalog.geonorge.no/search",
		api: "//kartkatalog.geonorge.no/api/search",
		queryParameter: '?text=',
		localUrl: false,
		autoComplete: true,
		geonorgeUrl: "//www.geonorge.no"
	}
};

var searchOption = searchOptionsArray.prod;

if (applicationEnvironment !== '' && applicationEnvironment !== null) {
	var searchOption = searchOptionsArray[applicationEnvironment];
}