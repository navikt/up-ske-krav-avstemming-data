import { z } from "zod";

export const KravDTOSchema = z.object({
	gjelderID: z.string(),
	vedtaksDato: z.string(),
	saksnummer: z.string(),
	referanseGammeltVedtak: z.string(),
	belop: z.number(),
	renter: z.number(),
	totalSum: z.number(),
	behandlendeEnhet: z.string(),
	bostedEnhet: z.string(),
	ytelseKode: z.string(),
	lovHjemmel: z.string(),
	arsaksKode: z.string(),
	vedtakFraDato: z.string(),
	vedtakTilDato: z.string(),
	transaksjonsDarto: z.string(),
	datafil: z.string(),
	kilde: z.string(),
});

export const KravListeSchema = z.array(KravDTOSchema);

export type KravDto = z.infer<typeof KravDTOSchema>;