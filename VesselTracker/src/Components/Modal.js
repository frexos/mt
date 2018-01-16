import React from 'react';
import Transition from 'react-transition-group/Transition';

class ModalError extends React.Component {
	state = {
		showModal: false,
		entered: false
	}

	toggleState = () => {
		this.setState({ showModal: !this.state.showModal, entered: true});
	}

	componentDidMount = () => {
		if(!this.state.entered) {
			setTimeout(this.toggleState, 0);
		}
	}
		
	render() {

	return (
		<div className='modal'>
			<Transition in={this.state.showModal} timeout={1000}>
				{state => (
						<div style={{zIndex: 10, display: 'block', width: '320px', 
													height: '200px', backgroundColor: '#fff', margin: '0 auto',
													marginTop:'15%', transition: 'opacity 1s ease-out',	
													boxShadow: '0 4px 10px 4px rgba(19, 35, 47, 0.3)', 
													opacity: state === 'exited' ? 0: 1}}> 
							<div className='modalTitle'>
									An error has occured 
									<span className='close' onClick={this.props.click}>
										[X]
									</span>
							</div>
							<div className='errorMessage'>{this.props.errorMessage}</div>
						</div>
				)}
			</Transition>
		</div>
		);
	}
}

export default ModalError;