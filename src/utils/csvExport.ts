import type {KravDto} from "../types/schema/Krav";
import {toLocalShortDate} from "./dates";

function createCsv(krav: Array<KravDto>) {
	const csvHeaders = [
		"Avsender",
		"Beløp",
		"Beløp renter",
		"Corr-ID",
		"Behandlende enhet",
		"Bostedsenhet",
		"Fagsystem-ID",
		"Filnavn",
		"Fremtidig ytelse",
		"Gjelder-ID",
		"Årsakskode",
		"Hjemmelkode",
		"Krav-ID",
		"Kravidentifikator SKE",
		"Kravkode",
		"Kravtype",
		"Linjenummer",
		"Periode fra",
		"Periode til",
		"Referansenummer gammel sak",
		"Saksnummer NAV",
		"Status",
		"Opprettet",
		"Sendt",
		"Siste status",
		"Tilleggsfrist",
		"Transaksjonsdato",
		"Utbetalingsdato",
		"Vedtaksdato",
	].join(";");

	const csvValue = (value: string | number | undefined) => {
		const text = value?.toString() ?? "";
		return /[;"\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
	};

	const csvData = krav.map((k) =>
		[
			k.avsender,
			k.belop,
			k.belopRente,
			k.corrId,
			k.enhetBehandlende,
			k.enhetBosted,
			k.fagsystemId,
			k.filnavn,
			k.fremtidigYtelse,
			String(k.gjelderId).padStart(11, '0'),
			k.kodeArsak,
			k.kodeHjemmel,
			k.kravId,
			k.kravidentifikatorSKE,
			k.kravkode,
			k.kravtype,
			k.linjenummer,
			k.periodeFOM,
			k.periodeTOM,
			k.referansenummerGammelSak,
			k.saksnummerNAV,
			k.status,
			k.tidspunktOpprettet,
			k.tidspunktSendt,
			k.tidspunktSisteStatus,
			k.tilleggsfrist,
			k.transaksjonsDato,
			k.utbetalDato,
			k.vedtaksDato,
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