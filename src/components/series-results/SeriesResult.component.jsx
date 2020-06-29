import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class SeriesResult extends Component {
  state = {
    open: false,
    currentSer: ''
  };

  handleOpen = img => {
    this.setState({ open: true, currentSer: img });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let seriesListContent;
    const { series } = this.props;

    if (series) {
      seriesListContent = (
        <GridList cols={4}>
          {series.map(ser => (
            <GridTile
              title={ser.tags}
              key={ser.id}
              subtitle={
                <span>
                  by <strong>{ser.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton onClick={() => this.handleOpen(ser.largeImageURL)}>
                  <ZoomIn color="white" />
                </IconButton>
              }
            >
              <img src={ser.largeImageURL} alt="" />
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      seriesListContent = null;
    }

    const actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ];

    return (
      <div>
        {seriesListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentSer} alt="" style={{ width: '100%' }} />
        </Dialog>
      </div>
    );
  }
}

SeriesResult.propTypes = {
  series: PropTypes.array.isRequired
};

export default SeriesResult;