import { Card, Grid } from "@nextui-org/react";
import { NextPage } from "next";

const Expenses: NextPage = () => {
    return (
        <>
            <p>expenses page</p>
            <Grid.Container gap={2}>
                <Grid xs={6}>
                    <Card variant="bordered">
                        <p>component 1 of 4</p>
                    </Card>
                </Grid>
                <Grid xs={6}>
                    <p>component 2 of 4</p>
                </Grid>
                <Grid xs={6}>
                    <p>component 3 of 4</p>
                </Grid>
                <Grid xs={6}>
                    <p>component 4 of 4</p>
                </Grid>
            </Grid.Container>
        </>
    );
};

export default Expenses;