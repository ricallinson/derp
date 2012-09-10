define(["lib/utils"], function (utils) {
	return {

		helpers: ["composite", "html"],

		index: function (api) {
			api.use.composite.execute("modules/cms-admin/ctrl", "theme", {}, function (data, meta) {
                api.use.html.done(data, meta);
            });
		},

		theme: function (api) {

			// Get theme from config
			var meta = {
					tmpl: {
						module: "modules/theme-admin/tmpls",
						name: "index"
					}
				};

			api.done({}, meta);
		}
	};
});