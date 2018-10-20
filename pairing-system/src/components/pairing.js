import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Button } from "@material-ui/core";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 400,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class Pairing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Student2: [],
            filterStudent: [],
            message: ''
        }
    }
    componentDidMount() {
        axios.get('/getParingStudent').then(res => {
            this.setState({
                Student2: res.data
            })
        }).catch(err => {
            console.log(err);
        })
    }
    
    pairing = () => {
        let ar = []
        let pair2 = []
        for (let q = 0; q < this.state.Student2.length; q++) { //filter the array
            ar.push(this.state.Student2[q].studentName)
            pair2.push(this.state.Student2[q].studentName)
        }
        let arr = []
        let index
        for (let i = 0; i < ar.length; i++) { // random pair
            index = Math.floor(Math.random() * ar.length)
            arr.push(ar[index])
            ar.splice(index, 1)
            i--
        }
        for (let t = 0; t < pair2.length; t++) { //None repeated users
            for (let o = 0; o < arr.length; o++) {
                if (pair2[t] === arr[o] && t === o) {
                    console.log("checkk", pair2[t], arr[o], "index: ", t, o)
                    return this.pairing()
                }
            }
        }
        this.setState({ filterStudent: arr, message: "Look at your pair" })
    }

    render() {
        const student1 = this.state.Student2.map(row => {
            return (
                <Paper className={this.props.classes.root} key={row}>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Student1</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow className={this.props.classes.row} >
                                <CustomTableCell component="th" scope="row">
                                    {row.studentName}
                                </CustomTableCell>

                            </TableRow>

                        </TableBody>
                    </Table>
                </Paper>
            )
        })
        const student2 = this.state.filterStudent.map(elem => {
            return (
                <Paper className={this.props.classes.root} key={elem}>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Student2</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow className={this.props.classes.row} >
                                <CustomTableCell component="th" scope="row">
                                    {elem}
                                </CustomTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            )
        })
        return (
            <Grid container>
                <Grid container justify="space-evenly">
                    <Grid item direction="row" >
                        <Button style={{
                            height: "50px",
                            width: "200px",
                            backgroundColor: "#5cb85c",
                            borderRadius: '25px',
                            color: "white",
                            margin: "20px"
                        }} onClick={this.pairing}>Pairing</Button>
                        <Button style={{
                            height: "50px",
                            width: "200px",
                            backgroundColor: "#5cb85c",
                            borderRadius: '25px',
                            color: "white",
                            margin: "20px"
                        }}>Save</Button>
                    </Grid >
                </Grid>
                <Grid container>
                    <Grid item>
                        <br />
                    </Grid>

                </Grid>
                <Grid container>

                    <Grid item>
                        <br />
                    </Grid>

                </Grid>

                <Grid container justify="space-evenly" direction="row">
                    <Grid item>
                        <Grid container
                            justify="flex-start" direction="column"
                        >
                            <Grid item>
                                {student1}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container
                            justify="flex-end" direction="column"
                        >
                            <Grid item>
                                {student2}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item>
                        <br />
                    </Grid>

                </Grid>
                <Grid container>

                    <Grid item>
                        <br />
                    </Grid>

                </Grid>
                <Grid container justify="center" >
                    <Grid item>
                        <h1>{this.state.message}</h1>
                    </Grid>

                </Grid>
            </Grid>

        )
    }
}

Pairing.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pairing);