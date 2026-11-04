import {Box, Button, DatePicker, Heading, HStack, Loader, Table, VStack} from "@navikt/ds-react";
import {useGetAvstemmingsdata} from "../api/apiService";
import {useState} from "react";
import type {KravDto} from "../types/schema/Krav";
import {downloadAsCsv} from "../utils/csvExport";
import {FileCsvIcon} from "@navikt/aksel-icons";
import {toLocalShortDate} from "../utils/dates";

export type DateRange = {
    from: Date;
    to: Date | undefined;
}

export default function AvstemmingDataPage() {
    const [dateRange, setDateRange] = useState<DateRange | null>(null);
    const {data, isLoading} = useGetAvstemmingsdata(dateRange, !!dateRange?.from && !!dateRange?.to);
    if (isLoading) {
        return (
            <Loader size="3xlarge" title="Henter data..."/>
        );
    }

    return (
        <>
            <Box marginInline={"auto"} padding="space-16">
                <Heading spacing level="1" size="large">
                    Avstemmingsdata fra Ske-Krav
                </Heading>
                <Box padding="space-24" background={"meta-purple-soft"} borderRadius="8">
                    <HStack align={"end"} gap={"space-16"}>
                        <DatePicker.Standalone mode={"range"} onSelect={(dateRange) => {
                            setDateRange({from: dateRange?.from ?? new Date(), to: dateRange?.to})
                        }}/>
                        <VStack align={"end"}>
                            <Button
                                data-umami-event={"eksportert til excel"}
                                size={"small"}
                                variant={"primary"}
                                icon={<FileCsvIcon title="Til Excel" fontSize="1.5rem"/>}
                                iconPosition={"right"}
                                onClick={() =>
                                    downloadAsCsv(toLocalShortDate(dateRange?.from), toLocalShortDate(dateRange?.to), data ?? [])
                                }
                            >
                                Til Excel
                            </Button>
                        </VStack>
                    </HStack>
                </Box>
            </Box>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Avsender</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Beløp</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Beløp renter</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Corr-ID</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Behandlende enhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Bostedsenhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Fagsystem-ID</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Filnavn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Fremtidig ytelse</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Gjelder-ID</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Årsakskode</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Hjemmelkode</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Krav-ID</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Kravidentifikator SKE</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Kravkode</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Kravtype</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Linjenummer</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Periode fra</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Periode til</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Referansenummer gammel sak</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Saksnummer NAV</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Status</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Opprettet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Sendt</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Siste status</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Tilleggsfrist</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Transaksjonsdato</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Utbetalingsdato</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Vedtaksdato</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data?.map((avstemmingsgrunnlag: KravDto) => {
                        return (
                            <Table.Row key={avstemmingsgrunnlag.kravId}>
                                <Table.DataCell>{avstemmingsgrunnlag.avsender}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.belop}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.belopRente}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.corrId}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.enhetBehandlende}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.enhetBosted}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.fagsystemId}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.filnavn}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.fremtidigYtelse}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.gjelderId}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.kodeArsak}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.kodeHjemmel}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.kravId}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.kravidentifikatorSKE}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.kravkode}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.kravtype}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.linjenummer}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.periodeFOM}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.periodeTOM}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.referansenummerGammelSak}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.saksnummerNAV}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.status}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.tidspunktOpprettet}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.tidspunktSendt}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.tidspunktSisteStatus}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.tilleggsfrist}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.transaksjonsDato}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.utbetalDato}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.vedtaksDato}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </>
    );
}
