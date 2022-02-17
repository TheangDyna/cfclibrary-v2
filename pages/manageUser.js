import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  lighten,
  makeStyles,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  Dialog,
  Fab,

} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { ALLUSER, USER, CLDEU, CLUPU, USERED} from '../state/mapState';
import UpdateUser from './components/containers/UpdateUser';
import DeleteUser from './components/containers/DeleteUser';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
  { id: 'createAt', numeric: true, disablePadding: false, label: 'Add At' },
  { id: 'updateAt', numeric: true, disablePadding: false, label: 'update At' },
  { id: 'update', numeric: true, disablePadding: false, label: 'Update' },
  { id: 'del', numeric: true, disablePadding: false, label: 'Delete' },

];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={clsx(classes.root)}
    >
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        CFC Manage Student
      </Typography>
      <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '0px auto'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
},
}));

export default function manageUser() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('createAt');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const users = useRecoilValue(ALLUSER);
  const [clUpU, setClUpU] = useRecoilState(CLUPU);
  const [clDeU, setClDeU] = useRecoilState(CLDEU);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  const fetchUser= (user) => {
    setClUpU(true);
    setUser(user);
  }

  const deleteUser = (user) => {
    setClDeU(true);
    setUser(user);
  }

  const router = useRouter();
  const usered = useRecoilValue(USERED);
  useEffect(()=>{
    if(usered){
      router.push('/home')
    }
  })

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(users, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover key={index}>
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none" style={{ maxWidth: 400 }} > {user.email} </TableCell>
                      <TableCell align="right">{user.createAt}</TableCell>
                      <TableCell align="right">{user.updateAt ? user.updateAt : <span style={{ fontStyle: 'italic', color: 'gray', fontWeight: 'lighter', fontSize: 13 }}>No Update</span>}</TableCell>
                      <TableCell align="right">
                        <Button size='small' variant='outlined' style={{ color: 'blue', border: '1px solid blue' }} onClick={() => fetchUser(user)}>
                          Update
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button size='small' variant='outlined' style={{ color: 'red', border: '1px solid red' }} onClick={() => deleteUser(user)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch color='primary' checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <Dialog open={clUpU}>
        <UpdateUser  />
      </Dialog>
      <Dialog open={clDeU}>
        <DeleteUser />
      </Dialog>
    </div>
  );
}
