import { HttpResponse, http } from "msw";

export const handlers = [
	http.get("/ske-krav/api/v1/rapporter/avstemming/oversikt/:from/:to", () => {
		return HttpResponse.json(
			[
					{
						"kilde": "ARENA",
						"trekkgrunnlag": " AT",
						"belop": 21440.0,
						"renter": 0.0,
						"behandlendeEnhet": "4416",
						"boenhet": "0301",
						"datafil": "ARENAAR20261015120337.DAT",
						"foedselsnummer": "17829598965",
						"aarsakskode": "",
						"lovhjemmel": "AT",
						"ytelse": "AE AA",
						"vedtaksperiodeFraOgMed": "20260614",
						"vedtaksperiodeTilOgMed": "20260628",
						"refGmlVedtak": "",
						"saksnummer": "000020260271345001",
						"transaksjonsdato": "20261015",
						"vedtaksdato": "2026-10-15"
					},
			],
			{ status: 200 },
		);
	}),
];
