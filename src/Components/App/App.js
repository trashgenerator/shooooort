import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LinkActions from 'Flux/actions/links';
import * as LinkInfoActions from 'Flux/actions/linkInfo';
import TimeoutTransitionGroup from 'react-components/timeout-transition-group';

import CreateLinkForm from 'Components/CreateLinkForm/CreateLinkForm';
import LinkList from 'Components/LinkList/LinkList';

import 'normalize.css/normalize.css';
import './style.scss';

class App extends Component {
  componentDidMount() {
    this.props.links.filter(link => link.shortcode).map(link => {
      this.props.dispatch(LinkInfoActions.linkInfo(link.shortcode));
    });
  }
  render() {
    const { links, dispatch } = this.props;
    const actions = bindActionCreators(LinkActions, dispatch);

    return (
      <div className="Container">
        <div className="Header">
          <div className="Column-4">
            <h1 className="Header__Logo">Shooooort</h1>
          </div>
          <div className="Column-4">
            <h2 className="Header__Tagline">The link shortener with a long name</h2>
          </div>
        </div>
        <CreateLinkForm createLink={ actions.createLink } />

        <TimeoutTransitionGroup
            enterTimeout={500}
            leaveTimeout={500}
            transitionName="LinkList">
            { links.length ? <LinkList links={links} deleteAllLinks={ actions.deleteAllLinks } /> : null }
        </TimeoutTransitionGroup>
        <div className="Ribbon">
          <a href="https://github.com/trashgenerator/shooooort/">
            Fork me on GitHub
          </a>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  links: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function select(state) {
  return {
    links: state.links,
  };
}

export default connect(select)(App);
