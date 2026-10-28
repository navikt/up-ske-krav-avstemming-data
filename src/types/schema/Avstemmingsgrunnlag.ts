import { z } from "zod";

export const AvstemmingsgrunnlagSchema = z.object({
	kilde: z.string(),
	trekkgrunnlag: z.string(),
	belop: z.number(),
	renter: z.number(),
	behandlendeEnhet: z.string(),
	boenhet: z.string(),
	datafil: z.string(),
	foedselsnummer: z.string(),
	aarsakskode: z.string(),
	lovhjemmel: z.string(),
	ytelse: z.string(),
	vedtaksperiodeFraOgMed: z.string(),
	vedtaksperiodeTilOgMed: z.string(),
	refGmlVedtak: z.string(),
	saksnummer: z.string(),
	transaksjonsdato: z.string(),
	vedtaksdato: z.string(),
});

export type AvstemmingsgrunnlagDto = z.infer<typeof AvstemmingsgrunnlagSchema>;