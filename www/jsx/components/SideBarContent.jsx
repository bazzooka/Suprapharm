import React from "react/addons";
import {Menus} from "../../datas/menu.js";

const update = React.addons.update;

const styles = {
    sidebar: {
        width: 256,
    },
    sidebarLink: {
        display: 'block',
        padding: '16px 0px',
        color: '#757575',
        textDecoration: 'none',
    },
    divider: {
        margin: '8px 0',
        height: 1,
        backgroundColor: '#757575',
    },
};
var SidebarContent = React.createClass({
    render() {
        let style = styles.sidebar;

        if (this.props.style) {
            style = update(style, {$merge: this.props.style});
        }
        let links = [],
            entries = Menus.entries;
        for(let i = 0, l = entries.length; i < l; i++) {
            links.push(
                <a key={i} href={entries[i].href} style={styles.sidebarLink} dangerouslySetInnerHTML={{__html:entries[i].title}}></a>);
        }

        return (
            <div title="Menu" style={style}>
                <a href='index.html' style={styles.sidebarLink}>Home</a>
                <a href='responsive_example.html' style={styles.sidebarLink}>Responsive Example</a>
                <div style={styles.divider} />
                {links}
            </div>);
    },
});

export default SidebarContent;