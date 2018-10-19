import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, TextField, Button } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';

const Level = [
    {
        value: '1',
        label: '1',
    },
    {
        value: '2',
        label: '2',
    },
    {
        value: '3',
        label: '3',
    },
    {
        value: '4',
        label: '4',
    },
    {
        value: '5',
        label: '5',
    },
];

function rand() {
    return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
        },

    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    level: {
        width: 300,
    },
});



class AddStudent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            studentName: '',
            level: '1',
            updateLevel: '1',
            rows: [],
            open: false,
            id: ''
        }
    }
    updateLevel = () => {
        console.log('jackel is here', this.state.id);
        axios({
            method: 'POST',
            url: '/updateLevel',
            data: { level: this.state.updateLevel, id: this.state.id },
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            alert("your level has been updated")
            window.location.reload()
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount() {
        axios.get('/getStudents').then(res => {
            this.setState({
                rows: res.data,
            })

        }).catch(err => {
            console.log(err)
        })
    }

    onChange = (text) => {
        this.setState({ studentName: text.target.value })

    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleChangeModel = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }
    addStudent = () => {
        if (this.state.studentName.length === 0) {
            alert("Kindly add your name frist <3")
        } else {
            axios({
                method: 'POST',
                url: '/addstudent',
                data: { studentName: this.state.studentName, level: this.state.level },
                headers: { 'Content-Type': 'application/json' }
            })
                .then((res) => {
                    alert('your information has been save')
                    window.location.reload();
                }).catch((err) => {
                    alert('this student is already exist')
                })
        }

    }

    deleteRow = (id) => {
        axios({
            method: 'POST',
            url: '/deleteStudent',
            data: { id },
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            alert('your row has been deleted');
            window.location.reload();
        }).catch(err => {
            console.log(err)
        })
    }

    handleOpen = (id) => {
        this.setState({ id: id, open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        return (
            <Grid container>
                <Grid container direction="row" justify="space-evenly" >
                    <Grid item >
                        <TextField
                            label="Full Name"
                            placeholder="Full Name"
                            type="text"
                            className={styles.textField}
                            margin="normal"
                            onChange={this.onChange}
                        />
                    </Grid>
                    <Grid item >
                        <TextField
                            id="Standar Level"
                            select
                            label="Level (1-5)"
                            className={styles.textField}
                            value={this.state.level}
                            onChange={this.handleChange('level')}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: styles.level,
                                },
                            }}
                            helperText="Please select your level"
                            margin="normal"
                        >
                            {Level.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>

                    </Grid>
                    <Grid item >
                        <Button onClick={this.addStudent} style={{
                            height: "50px",
                            width: "200px",
                            backgroundColor: "#5cb85c",
                            borderRadius: '25px',
                            color: "white",
                            margin: "20px"
                        }} > Add </Button>
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
                <Grid container justify="space-evenly">
                    <Grid item>
                        <Paper className={styles.root}>
                            <Table className={styles.table}>
                                <TableHead>
                                    <TableRow>
                                        <CustomTableCell>NAME</CustomTableCell>
                                        <CustomTableCell >LEVEL</CustomTableCell>
                                        <CustomTableCell >EDIT OR DELETE</CustomTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.rows.map(row => {
                                        return (
                                            <TableRow className={styles.row} key={row.id} >
                                                <CustomTableCell component="th" scope="row">
                                                    {row.studentName}
                                                </CustomTableCell>
                                                <CustomTableCell numeric>{row.level}</CustomTableCell>
                                                <Button style={{
                                                    backgroundColor: "#17a2b8",
                                                    borderRadius: '25px',
                                                    color: "white",
                                                    margin: "20px"
                                                }} onClick={() => this.handleOpen(row._id)}>Edit</Button>

                                                <Button onClick={() => this.deleteRow(row._id)} style={{
                                                    backgroundColor: "#dc3545",
                                                    borderRadius: '25px',
                                                    color: "white",
                                                    margin: "20px"
                                                }}>Delete</Button>
                                            </TableRow>


                                        );
                                    })}

                                </TableBody>

                            </Table>

                        </Paper>

                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item> <br /></Grid>
                </Grid>
                <Grid container>
                    <Grid item> <br /></Grid>
                </Grid>


                <Grid container>
                    <div>
                        <Modal

                            open={this.state.open}
                            onClose={this.handleClose}
                        >
                            <div style={getModalStyle()} className={this.props.classes.paper}>
                                <Typography variant="h6" id="modal-title">
                                    You can only update your level
                                </Typography>
                                <Grid item direction="row" justify="space-evenly">
                                    <TextField
                                        id="Standar Level1"
                                        select
                                        label="Select your level from(1-5)"

                                        fullWidth
                                        className={styles.textField}
                                        value={this.state.updateLevel}
                                        onChange={this.handleChangeModel('updateLevel')}
                                        SelectProps={{
                                            native: true,
                                            MenuProps: {
                                                className: styles.level,
                                            },
                                        }}
                                        helperText="Edit your level"
                                        margin="normal"

                                    >
                                        {Level.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>

                                    <Button onClick={this.updateLevel} style={{
                                        height: "50px",
                                        width: "200px",
                                        backgroundColor: "#5cb85c",
                                        borderRadius: '25px',
                                        color: "white",
                                        margin: "20px"
                                    }} > Submit your update </Button>
                                </Grid>
                            </div>
                        </Modal>
                    </div>
                </Grid>
            </Grid >
        )
    }
}

AddStudent.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AddStudent);



