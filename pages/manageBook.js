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
import { BOOKS, CLUPBO, CLDEBO, BOOK, CLOSE, USERED } from '../state/mapState';
import UpdateBook from './components/containers/UpdateBook';
import DeleteBook from './components/containers/DeleteBook';
import AddBooks from './components/containers/AddBooks';
import AddIcon from '@material-ui/icons/Add';

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
  { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
  { id: 'stock', numeric: true, disablePadding: false, label: 'Stock' },
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
        CFC Manage Book
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

export default function manageBook() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('createAt');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const books = useRecoilValue(BOOKS);
  const [clUpBo, setClUpBo] = useRecoilState(CLUPBO);
  const [clDeBo, setClDeBo] = useRecoilState(CLDEBO);
  const setBook = useSetRecoilState(BOOK);
  const [close, setClose] = useRecoilState(CLOSE);

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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, books.length - page * rowsPerPage);

  const fetchBook = (book) => {
    setClUpBo(true);
    setBook(book);
  }

  const deleteBook = (book) => {
    setClDeBo(true);
    setBook(book);
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
              {stableSort(books, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((book, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover key={index}>
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none" style={{ maxWidth: 400 }} > {book.title} </TableCell>
                      <TableCell align="right">{Number(book.stock) > 1 ? <span style={{ color: 'green', fontWeight: 'bold' }}>{book.stock}</span> : <span style={{ color: 'red', fontWeight: 'bold' }}>{book.stock}</span>}</TableCell>
                      <TableCell align="right">{book.createAt}</TableCell>
                      <TableCell align="right">{book.updateAt ? book.updateAt : <span style={{ fontStyle: 'italic', color: 'gray', fontWeight: 'lighter', fontSize: 13 }}>No Update</span>}</TableCell>
                      <TableCell align="right">
                        <Button size='small' variant='outlined' style={{ color: 'blue', border: '1px solid blue' }} onClick={() => fetchBook(book)}>
                          Update
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button size='small' variant='outlined' style={{ color: 'red', border: '1px solid red' }} onClick={() => deleteBook(book)}>
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
          count={books.length}
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
      <Fab color='primary' className={classes.fab} onClick={() => setClose(true)}>
            <AddIcon />
          </Fab>
      <Dialog open={clUpBo}>
        <UpdateBook />
      </Dialog>
      <Dialog open={clDeBo}>
        <DeleteBook />
      </Dialog>
      <Dialog open={close}>
        <AddBooks />
      </Dialog>
    </div>
  );
}
