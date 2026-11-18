import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig(({ mode }) => ({
	base: "/ske-krav-avstemming-data",
	css: {
		modules: {
			generateScopedName: "[name]__[local]___[hash:base64:5]",
		},
	},
	server: {
		proxy: {
			...(mode === "backend" && {
				"/ske-krav-avstemming-data/ske-krav/api": {
					target: "http://localhost:8080",
					rewrite: (path: string) =>
						path.replace(/^\/ske-krav-avstemming-data\/ske-krav/, ""),
					changeOrigin: true,
					secure: false,
				},
			}),
			...(mode === "mock" && {
				"/ske-krav-avstemming-data/mockServiceWorker.js": {
					target: "http://localhost:5173",
					rewrite: () => "/ske-krav-avstemming-data/mockServiceWorker.js",
				},
			}),
		},
	},
	plugins: [react(), cssInjectedByJsPlugin()],
}));
