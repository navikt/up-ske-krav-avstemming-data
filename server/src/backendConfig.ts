export const backendConfig = {
    local: {
        url: "http://localhost:8080",
        audience: "sokos-ske-krav",
    },
    development: {
        url: "https://sokos-ske-krav.intern.dev.nav.no",
        audience: "api://dev-gcp.okonomi.sokos-ske-krav/.default",
    },
    production: {
        url: "https://sokos-ske-krav.intern.nav.no",
        audience: "api://prod-gcp.okonomi.sokos-ske-krav/.default",
    },
} as const;