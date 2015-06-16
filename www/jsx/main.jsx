var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    RouteHandler = Router.RouteHandler;

var App = React.createClass({
    render () {
        return (
            <div>
                <h1>App</h1>
                <RouteHandler/>
            </div>
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

//React.render((
//    <Router history={Router.HashLocation}>
//        <Route handler={App}>
//            <Route path="about" handler={About}/>
//            <Route path="inbox" handler={Inbox}/>
//        </Route>
//    </Router>
//), document.getElementById('example'));