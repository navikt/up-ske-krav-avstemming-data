import type { KravDto } from "../types/schema/Krav";
import { toLocalShortDate } from "./dates";

function createCsv(krav: Array<KravDto>) {
	const csvHeaders = [
		"Gjelder-ID",
		"Vedtaksdato",
		"Saksnummer",
		"Referanse gammelt vedtak",
		"Beløp",
		"Renter",
		"Total sum",
		"Behandlende enhet",
		"Bostedsenhet",
		"Ytelseskode",
		"Lovhjemmel",
		"Årsakskode",
		"Vedtak fra dato",
		"Vedtak til dato",
		"Transaksjonsdato",
		"Datafil",
		"Kilde",
	].join(";");

	const csvValue = (value: string | number) => {
		const text = value ? `${value}` : "";
		return /[;"\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
	};

	const csvData = krav.map((k) =>
		[
			k.gjelderID,
			k.vedtaksDato,
			k.saksnummer,
			k.referanseGammeltVedtak,
			k.belop,
			k.renter,
			k.totalSum,
			k.behandlendeEnhet,
			k.bostedEnhet,
			k.ytelseKode,
			k.lovHjemmel,
			k.arsaksKode,
			k.vedtakFraDato,
			k.vedtakTilDato,
			k.transaksjonsDato,
			k.datafil,
			k.kilde,
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