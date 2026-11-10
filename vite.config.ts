import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig(({ mode }) => ({
	base: "/up-ske-krav-avstemming-data",
	css: {
		modules: {
			generateScopedName: "[name]__[local]___[hash:base64:5]",
		},
	},
	server: {
		proxy: {
			...(mode === "backend" && {
				"/up-ske-krav-avstemming-data/ske-krav/api": {
					target: "http://localhost:8080",
					rewrite: (path: string) =>
						path.replace(/^\/up-ske-krav-avstemming-data\/ske-krav/, ""),
					changeOrigin: true,
					secure: false,
				},
			}),
			...(mode === "mock" && {
				"/mockServiceWorker.js": {
					target: "http://localhost:5173",
					rewrite: () => "/mockServiceWorker.js",
				},
			}),
		},
	},
	plugins: [react(), cssInjectedByJsPlugin()],
}));
