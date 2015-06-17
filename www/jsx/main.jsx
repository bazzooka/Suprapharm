import React from 'react';
import Router from 'react-router';
import Sidebar from 'react-sidebar';
import SidebarContent from './components/SidebarContent.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

let Route = Router.Route,
    RouteHandler = Router.RouteHandler;

var App = React.createClass({
    getInitialState() {
        return {docked: false, open: false};
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    },

    toggleOpen(ev) {
        this.setState({open: !this.state.open});

        if (ev) {
            ev.preventDefault();
        }
    },

    onSetOpen(open) {
        this.setState({open: open});
    },

    componentDidMount() {
        let mql = window.matchMedia(`(min-width: 800px)`);
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql: mql, docked: mql.matches});
    },

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    },

    mediaQueryChanged() {
        this.setState({docked: this.state.mql.matches});
    },

    render : function(){
        let sidebar = <SidebarContent />;

        const styles = {
            contentHeaderMenuLink: {
                textDecoration: 'none',
                color: 'white',
                padding: 8,
            },
        };

        console.log("Docked ? ", this.state.docked);

        let contentHeader = (
            <span>
                {!this.state.docked &&
                <a onClick={this.toggleOpen} href='#' style={styles.contentHeaderMenuLink}>===========</a>} <span> Responsive React Sidebar</span>
      </span>);
        let sidebarProps = {
            sidebar: sidebar,
            docked: this.state.docked,
            open: this.state.open,
            onSetOpen: this.onSetOpen,
            touch: true,
        };

        return (
            <Sidebar {...sidebarProps}>
                {contentHeader}
                <p>
                    Thiiis example will automatically dock the sidebar if the page
                    width is above 800px (which is currently {''+this.state.docked}).
                </p>
                <p>
                    This functionality should live in the component that renders the sidebar.
                    This way you're able to modify the sidebar and main content based on the
                    responsiveness data. For example, the menu button in the header of the
                    content is now {this.state.docked ? 'hidden' : 'shown'} because the sidebar
                    is {!this.state.docked && 'not'} visible.
                </p>
                <div style={{"position":"absolute", "bottom": 0, "right": 0,"background": "black", "color": "white"}} id="debugger">1231321321</div>
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