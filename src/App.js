import './App.css';

import * as _ from 'lodash';

import { Button, MuiThemeProvider } from 'material-ui';
import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';

import AppBar from 'material-ui/AppBar';
import { Obsequios } from './obsequios';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

console.log('Obsequios', Obsequios);

const columnData = [
  { id: 'Funcionario_Apellido_Completo', numeric: false, disablePadding: false, label: 'Apellido' },
  { id: 'Funcionario_Nombre_Completo', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'Funcionario_Funcion', numeric: false, disablePadding: false, label: 'Función' },
  { id: 'Funcionario_Cuil', numeric: true, disablePadding: false, label: 'CUIT' },
  { id: 'Obsequio_Descripcion', numeric: false, disablePadding: false, label: 'Obsequio' },
  { id: 'Obsequio_Valor_Estimado', numeric: false, disablePadding: false, label: 'Valor estimado del obsequio' }
];

class EnhancedTableHead extends Component {
  static propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell key={column.id} numeric={column.numeric} disablePadding={column.disablePadding}>
                <TableSortLabel active={orderBy === column.id} direction={order} onClick={this.createSortHandler(column.id)}>
                  {column.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

class App extends Component {
  state = {
    order: 'asc',
    orderBy: 'Funcionario_Apellido_Completo',
    selected: [],
    data: Obsequios
  };

  handleRequestSort = (event, property) => {
    var t0 = performance.now();

    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data = _.orderBy(this.state.data, [orderBy], [order]);

    this.setState({ data, order, orderBy });

    var t1 = performance.now();
    console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');
  };

  render() {
    const { data, order, orderBy } = this.state;

    console.log('render');

    return (
      <Paper>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography type="title" color="inherit">
              Obsequios a funcionarios públicos
            </Typography>
          </Toolbar>
        </AppBar>
        <Table>
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={this.handleRequestSort} />
          <TableBody>
            {data.map(obsequio => {
              return (
                <TableRow key={obsequio.Registro}>
                  {columnData.map(column => {
                    {
                      return (
                        <TableCell style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                          {obsequio[column.id]}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default App;
