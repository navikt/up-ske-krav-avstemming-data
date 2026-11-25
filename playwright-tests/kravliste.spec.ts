import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";
import kravliste from "../mock/kravliste.json" with { type: "json" };
import { KravListeSchema } from "../src/types/schema/Krav";
import { createCsv } from "../src/utils/csvExport";

test.use({ serviceWorkers: "block" });

test("validates the mock DTO and exports every field, including zero values", () => {
	const krav = KravListeSchema.parse(kravliste);
	const first = krav[0];
	const csv = createCsv([{ ...first, filnavn: 'fil;"navn".txt' }]);

	expect(csv.split("\n")).toEqual([
		"Gjelder-ID;Vedtaksdato;Saksnummer;Kravidentifikator;Fagsystem-ID;Referanse gammelt vedtak;Beløp;Renter;Total sum;Behandlende enhet;Ytelseskode;Lovhjemmel;Årsakskode;Periode fra dato;Periode til dato;Dato sendt;Filnavn;Avsender",
		`${first.gjelderID};${first.vedtaksDato};${first.saksnummer};${first.kravidentifikator};${first.fagsystemID};${first.referanseGammeltVedtak};${first.belop};0;${first.totalSum};${first.behandlendeEnhet};${first.ytelseKode};${first.lovHjemmel};${first.arsaksKode};${first.periodeFraDato};${first.periodeTilDato};${first.datoSendt};"fil;""navn"".txt";${first.avsender}`,
	]);
});

test("displays and downloads the new DTO", async ({ page }) => {
	await page.route("**/ske-krav/api/up-tilbakekreving/**", (route) =>
		route.fulfill({ json: kravliste }),
	);
	await page.goto("/avstemmingsdata-fra-ske-krav/");

	const days = page.locator("button.rdp-day:not([disabled])");
	await days.nth(10).click();
	await days.nth(12).click();

	const first = kravliste[0];
	const table = page.locator("table").filter({
		has: page.getByRole("columnheader", { name: "Kravidentifikator" }),
	});
	const rows = table.locator("tbody tr");
	const row = rows.first();
	await expect(rows).toHaveCount(kravliste.length);
	await expect(row.locator("td")).toHaveText([
		first.gjelderID,
		first.vedtaksDato,
		first.saksnummer,
		first.kravidentifikator,
		first.fagsystemID,
		first.referanseGammeltVedtak,
		String(first.belop),
		String(first.renter),
		String(first.totalSum),
		first.behandlendeEnhet,
		first.ytelseKode,
		first.lovHjemmel,
		first.arsaksKode,
		first.periodeFraDato,
		first.periodeTilDato,
		first.datoSendt,
		first.filnavn,
		first.avsender,
	]);

	const downloadPromise = page.waitForEvent("download");
	await page.getByRole("button", { name: "Til Excel" }).click();
	const download = await downloadPromise;
	const csv = await readFile(await download.path(), "utf8");
	expect(csv).toBe(`\uFEFF${createCsv(KravListeSchema.parse(kravliste))}`);
});
