import React from 'react';
import Router from 'react-router';
import Sidebar from 'react-sidebar';

let Route = Router.Route,
    RouteHandler = Router.RouteHandler;

var App = React.createClass({
    getInitialState: function() {
        return {sidebarOpen: false};
    },

    onSetSidebarOpen: function(open) {
        this.setState({sidebarOpen: open});
    },

    render : function(){
        var sidebarContent = <b>Sidebar content</b>;

        return (
            <Sidebar sidebar={sidebarContent}
                     open={this.state.sidebarOpen}
                     onSetOpen={this.onSetSidebarOpen}>
                <b>Main content</b>
            </Sidebar>
        )
    }
});

var Inbox = React.createClass({
    render () {
        return (
            <div>
                <h1>Inbox</h1>
                <RouteHandler/>
            </div>
        )
    }
});

var Message = React.createClass({
    render () {
        return (
            <div>
                <span>Inbox 2</span>
                <RouteHandler/>
            </div>
        )
    }
});


var About = React.createClass({
    render () {
        return (
            <div>
                <h1>About</h1>
                <RouteHandler/>
            </div>
        )
    }
});

// declare our routes and their hierarchy
var routes = (
    <Route handler={App}>
        <Route name ="about" path="about" handler={About}/>
        <Route path="inbox" handler={Inbox}>
            <Route path="messages/:id" handler={Message}/>
        </Route>
    </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler />, document.getElementById('master-container'));
});