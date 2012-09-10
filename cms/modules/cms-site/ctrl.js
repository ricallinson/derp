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
			var meta,
				layout;

			meta = {
				tmpl: {
					module: "modules/theme-lite/tmpls",
					name: "index"
				}
			};

			layout = {
				adminbar: null,
				header: null,
				main: null,
				menu: null,
				footer: null
			};

			api.done({}, meta);
		}
	};
});