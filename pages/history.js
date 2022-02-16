import React from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Typography,
  Toolbar
} from '@material-ui/core';
import Banner from './components/presentaions/Banner';

function createDataUserHistoryList(date, bookTitle, action) {
  return { date, bookTitle, action };
}

const historyCurrentUser = [
  createDataUserHistoryList('08-01-2021', 'Hello kid1', 'Borrow'),
  createDataUserHistoryList('08-05-2021', 'Hello kid2', 'Return'),
  createDataUserHistoryList('08-06-2021', 'Hello kid3', 'Return'),
  createDataUserHistoryList('08-07-2021', 'Hello kid4', 'Return'),
  createDataUserHistoryList('08-08-2021', 'Hello kid5', 'Expired'),
  createDataUserHistoryList('08-10-2021', 'Hello kid6', 'Expired'),
];


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
  { id: 'date', numeric: false, label: 'Date (mm-dd-yy)' },
  { id: 'bookTitle', numeric: false, label: 'Book Title' },
  { id: 'action', numeric: false, label: 'Action' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
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
  borrow: {
    color: 'orange'
  },
  return: {
    color: 'green'
  },
  expired: {
    color: 'red'
  }
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Date (mm-dd-yy)');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  return (
    <div>
      <Banner title='History Page' img='url("./images/history.jpg")' />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Toolbar>
            <Typography>
              History
            </Typography>
          </Toolbar>
          <TableContainer>
            <Table>
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(historyCurrentUser, getComparator(order, orderBy))
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        key={row.date}
                      >
                        <TableCell />
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.bookTitle}</TableCell>
                        <TableCell
                          className={row.action == 'Borrow' ? classes.borrow
                            : row.action == 'Return' ? classes.return
                              : classes.expired}
                        >
                          {row.action}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>);
}