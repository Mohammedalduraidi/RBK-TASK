import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, TableBody, Table, TableCell, TableHead, TableRow } from '@material-ui/core';
import Axios from 'axios';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        width: "100%"
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
class history extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }
    componentDidMount() {
        Axios.get('/get/history')
            .then(({ data }) => {
                this.setState({ data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <Grid container direction='column' justify='center' alignItems='center'>
                {
                    this.state.data.map(elem => {
                        const student1 = elem.student1.map(row => {
                            return (
                                <TableRow className={this.props.classes.row} >
                                    <CustomTableCell component="th" scope="row">
                                        {row}
                                    </CustomTableCell>
                                </TableRow>
                            )
                        })
                        const student2 = elem.student2.map(elem => {
                            return (
                                <TableRow className={this.props.classes.row} >
                                    <CustomTableCell component="th" scope="row">
                                        {elem}
                                    </CustomTableCell>
                                </TableRow>
                            )
                        })
                        return (
                            <Grid item style={{margin:"30px"}} >
                                <Paper >
                                    <Table >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Student1</TableCell>
                                                <TableCell> Student2 </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableCell>{student1}</TableCell>
                                            <TableCell>{student2}</TableCell>
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }
}
export default withStyles(styles)(history);


/*
    
 */