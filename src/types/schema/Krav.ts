import { z } from "zod";

export const KravDTOSchema = z.object({
	gjelderID: z.string(),
	vedtaksDato: z.string(),
	saksnummer: z.string(),
	kravidentifikator: z.string(),
	fagsystemID: z.string(),
	referanseGammeltVedtak: z.string(),
	belop: z.number(),
	renter: z.number(),
	totalSum: z.number(),
	behandlendeEnhet: z.string(),
	ytelseKode: z.string(),
	lovHjemmel: z.string(),
	arsaksKode: z.string(),
	periodeFraDato: z.string(),
	periodeTilDato: z.string(),
	datoSendt: z.string(),
	filnavn: z.string(),
	avsender: z.string(),
});

export const KravListeSchema = z.array(KravDTOSchema);

export type KravDto = z.infer<typeof KravDTOSchema>;