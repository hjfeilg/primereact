import React, {Component} from 'react';
import classNames from 'classnames';

export class Messages extends Component {

    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
    }

    clear(event) {
        this.container.style.display = 'none';
        if(this.props.onClear) {
            this.props.onClear();
        }
        event.preventDefault();
    }

    render() {
        if(this.props.value && this.props.value.length) {
            var firstMessage = this.props.value[0];
            var severity = firstMessage.severity||'info';

            var className = classNames('ui-messages ui-widget ui-corner-all', {
                'ui-messages-info': severity === 'info',
                'ui-messages-warn': severity === 'warn',
                'ui-messages-error': severity === 'error',
                'ui-messages-success': severity === 'success'
            });

            var icon = classNames('ui-messages-icon fa fa-fw fa-2x', {
                'fa-info': severity === 'info',
                'fa-warning': severity === 'warn',
                'fa-close': severity === 'error',
                'fa-check': severity === 'success',
            });

            var closeIcon;
            if(this.props.closable) {
                closeIcon = <a href="#" className="ui-messages-close" onClick={this.clear}>
                                <i className="fa fa-close"></i>
                            </a>;
            }

            return <div className={className} style={this.props.style} ref={(el) => {this.container = el;}}>
                      {closeIcon}
                      <span className={icon}></span>
                      <ul>
                        {this.props.value.map((msg) => {
                          return <li key={msg.summary + msg.detail}>
                                    <span className="ui-messages-summary">{msg.summary}</span>
                                    <span className="ui-messages-detail">{msg.detail}</span>
                                </li>;  
                        })}
                      </ul>
                   </div>;
        }
        else {
            return null;
        }   
    }
}

Messages.defaultProps = {
    closable: true,
    className: null,
    style: null,
    onClear: null
}

Messages.propTypes = {
    closable: React.PropTypes.bool,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    onClear: React.PropTypes.func
};