require.config({
	paths: {
		angular: "../lib/ionic/js/ionic.bundle.min",
		domReady: "../lib/domReady/domReady"
	},
	shim: {
		angular: {
			exports: "angular"
		}
	},
    deps: ["./require-bootstrap"]
});
