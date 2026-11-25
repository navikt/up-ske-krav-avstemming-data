import {Box, Button, DatePicker, Heading, HStack, Loader, Table, VStack} from "@navikt/ds-react";
import {useGetAvstemmingsdata} from "../api/apiService";
import {useState} from "react";
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
                <Heading spacing level="1" size="large">
                    Avstemmingsdata fra Ske-Krav
                </Heading>
                <Box background={"meta-purple-soft"} borderRadius="8" padding="space-24">
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
            <Box padding="space-24" background={"default"} borderRadius="8">
            <Table zebraStripes>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Gjelder-ID</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Vedtaksdato</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Saksnummer</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Kravidentifikator</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Fagsystem-ID</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Referanse gammelt vedtak</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Beløp</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Renter</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Total sum</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Behandlende enhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Ytelseskode</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Lovhjemmel</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Årsakskode</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Periode fra dato</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Periode til dato</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Dato sendt</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Filnavn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Avsender</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body >
                    {data?.map((krav, index) => (
                        
                        <Table.Row key={`${krav.kravidentifikator}-${
                            // biome-ignore lint/suspicious/noArrayIndexKey: Kravid er nesten nok, men ikke helt og det er ikke noe annet vi kan kombinere med for å være sikker på at det er en primærnøkkel
                            index}`}>
                            <Table.DataCell>{krav.gjelderID}</Table.DataCell>
                            <Table.DataCell>{krav.vedtaksDato}</Table.DataCell>
                            <Table.DataCell>{krav.saksnummer}</Table.DataCell>
                            <Table.DataCell>{krav.kravidentifikator}</Table.DataCell>
                            <Table.DataCell>{krav.fagsystemID}</Table.DataCell>
                            <Table.DataCell>{krav.referanseGammeltVedtak}</Table.DataCell>
                            <Table.DataCell>{krav.belop}</Table.DataCell>
                            <Table.DataCell>{krav.renter}</Table.DataCell>
                            <Table.DataCell>{krav.totalSum}</Table.DataCell>
                            <Table.DataCell>{krav.behandlendeEnhet}</Table.DataCell>
                            <Table.DataCell>{krav.ytelseKode}</Table.DataCell>
                            <Table.DataCell>{krav.lovHjemmel}</Table.DataCell>
                            <Table.DataCell>{krav.arsaksKode}</Table.DataCell>
                            <Table.DataCell>{krav.periodeFraDato}</Table.DataCell>
                            <Table.DataCell>{krav.periodeTilDato}</Table.DataCell>
                            <Table.DataCell>{krav.datoSendt}</Table.DataCell>
                            <Table.DataCell>{krav.filnavn}</Table.DataCell>
                            <Table.DataCell>{krav.avsender}</Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            </Box>
        </>
    );
}
