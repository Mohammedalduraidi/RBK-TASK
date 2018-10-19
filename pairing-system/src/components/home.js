import React, { Component } from 'react'
import { Grid, Card, TextField, Button } from "@material-ui/core";
import { Link } from 'react-router-dom'
class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div style={{
                left: "40%",
                top: "40%",
                padding: "150px"
            }}>
                <Grid container direction="column" justify="space-evenly" alignItems="center" >

                    <Grid item>
                        <Card style={{ backgroundColor: "#337ab7" }}>

                            <Button style={{
                                height: "70px",
                                width: "200px",
                            }}>
                                <Link to="/addStudent" style={{ color: "white" }}> ADD STUDENT </Link>
                            </Button>


                        </Card>

                    </Grid>
                    <Grid item>
                        <br />
                    </Grid>
                    <Grid item>
                        <Card style={{ backgroundColor: "#337ab7" }}>

                            <Button style={{
                                height: "70px",
                                width: "200px",
                            }}>
                                <Link to="/pairing" style={{ color: "white" }}>PARING</Link>
                            </Button>


                        </Card>

                    </Grid>
                    <Grid item>
                        <br />
                    </Grid>
                    <Grid item>
                        <Card style={{ backgroundColor: "#337ab7" }}>

                            <Button style={{
                                height: "70px",
                                width: "200px",
                            }}>
                                <Link to="/history" style={{ color: "white" }}>history</Link>
                            </Button>


                        </Card>

                    </Grid>
                </Grid>

            </div>
        )
    }
}
export default Home;