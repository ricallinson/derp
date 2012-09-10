define(["lib/utils"], function (utils) {
	return {

		helpers: ["composite", "html"],

		index: function (api) {
			api.use.composite.execute("modules/cms-site/ctrl", "theme", {}, function (data, meta) {
                api.use.html.done(data, meta);
            });
		},

		theme: function (api) {

			// Get theme from config
			var meta = {
					tmpl: {
						module: "modules/theme-lite/tmpls",
						name: "index"
					}
				};

			api.done({}, meta);
		}
	};
});