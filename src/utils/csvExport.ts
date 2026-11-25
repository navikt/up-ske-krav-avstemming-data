import type { KravDto } from "../types/schema/Krav";
import { toLocalShortDate } from "./dates";

export function createCsv(krav: Array<KravDto>) {
	const csvHeaders = [
		"Gjelder-ID",
		"Vedtaksdato",
		"Saksnummer",
		"Kravidentifikator",
		"Fagsystem-ID",
		"Referanse gammelt vedtak",
		"Beløp",
		"Renter",
		"Total sum",
		"Behandlende enhet",
		"Ytelseskode",
		"Lovhjemmel",
		"Årsakskode",
		"Periode fra dato",
		"Periode til dato",
		"Dato sendt",
		"Filnavn",
		"Avsender",
	].join(";");

	const csvValue = (value: string | number) => {
		const text = `${value}`;
		return /[;"\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
	};

	const csvData = krav.map((k) =>
		[
			k.gjelderID,
			k.vedtaksDato,
			k.saksnummer,
			k.kravidentifikator,
			k.fagsystemID,
			k.referanseGammeltVedtak,
			k.belop,
			k.renter,
			k.totalSum,
			k.behandlendeEnhet,
			k.ytelseKode,
			k.lovHjemmel,
			k.arsaksKode,
			k.periodeFraDato,
			k.periodeTilDato,
			k.datoSendt,
			k.filnavn,
			k.avsender,
		]
			.map(csvValue)
			.join(";"),
	);

	return [csvHeaders, ...csvData].join("\n");
}

export function downloadAsCsv(
	fom: string,
	tom: string,
	krav: Array<KravDto>,
) {
	const csv = createCsv(krav);
	const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csv], {
		type: "text/csv;charset=utf-8",
	});
	const filename = `ske_krav_avstemmingsdata_${fom}_${tom}_${toLocalShortDate(new Date())}.csv`;

	const temporaryFileDownloadLink = document.createElement("a");
	temporaryFileDownloadLink.href = URL.createObjectURL(blob);
	temporaryFileDownloadLink.download = filename;

	temporaryFileDownloadLink.click();
	temporaryFileDownloadLink.remove();
}