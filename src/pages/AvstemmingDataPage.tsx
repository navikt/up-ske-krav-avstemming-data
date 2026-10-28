import {DatePicker, Heading, Loader, Table} from "@navikt/ds-react";
import {useGetAvstemmingsdata} from "../api/apiService";
import {useEffect, useState} from "react";
import {AvstemmingsgrunnlagDto} from "../types/schema/Avstemmingsgrunnlag";

export type DateRange = {
    from: Date;
    to: Date | undefined;
}

export default function AvstemmingDataPage() {
    const [dateRange, setDateRange] = useState<DateRange | null>(null);
 	const [shouldFetch, setShouldFetch] = useState<boolean>(false);
    const {data, isLoading} = useGetAvstemmingsdata(dateRange, shouldFetch);
    useEffect(() => {
        if (dateRange?.from && dateRange?.to) {
            setShouldFetch(true);
        }
    }, [dateRange]);
	if (isLoading) {
        return (
                <Loader size="3xlarge" title="Henter data..."/>
        );
    }

    return (
        <>
            <Heading spacing level="1" size="large">
                Hent avstemmingsdata fra ske-krav
            </Heading>
            <DatePicker.Standalone mode={"range"} onSelect={(dateRange) =>
                dateRange ? setDateRange({from: dateRange.from ?? new Date(), to: dateRange.to}) : null}/>

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Kilde</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Trekkgrunnlag</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Belop</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Renter</Table.HeaderCell>
                        <Table.HeaderCell scope="col">BehandlendeEnhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Boenhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Datafil</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Foedselsnummer</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Aarsakskode</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Lovhjemmel</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Ytelse</Table.HeaderCell>
                        <Table.HeaderCell scope="col">VedtaksperiodeFraOgMed</Table.HeaderCell>
                        <Table.HeaderCell scope="col">VedtaksperiodeTilOgMed</Table.HeaderCell>
                        <Table.HeaderCell scope="col">RefGmlVedtak</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Saksnummer</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Transaksjonsdato</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Vedtaksdato</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data?.map((avstemmingsgrunnlag: AvstemmingsgrunnlagDto) => {
                        return (
                            <Table.Row key={avstemmingsgrunnlag.saksnummer}>
                                <Table.DataCell>{avstemmingsgrunnlag.kilde}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.trekkgrunnlag}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.belop}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.renter}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.behandlendeEnhet}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.boenhet}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.datafil}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.foedselsnummer}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.aarsakskode}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.lovhjemmel}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.ytelse}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.vedtaksperiodeFraOgMed}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.vedtaksperiodeTilOgMed}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.refGmlVedtak}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.saksnummer}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.transaksjonsdato}</Table.DataCell>
                                <Table.DataCell>{avstemmingsgrunnlag.vedtaksdato}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </>
    );
}
