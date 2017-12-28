import React from 'react';
import './css/modal.css'

/*
 * @returns {ReactElement} markup
 * @param {object} buttons of the modal with their functionality.
 * @param {string} title The title of the modal.
 * @param {string} body The body of the modal.
 * @param {string} headerColor The background color of the title.
 */
function ShowModal(props){
  return (
    <div className="modal-root root">
      <div className="modal-dialog dialog">
        <div
          className="modal-header"
          style={{backgroundColor:props.headerColor}}
        >
          <h4>{props.title}</h4>
        </div>
      <div className="modal-body">
        {props.body}
      </div>
      <div className="modal-footer">
        {Object.keys(props.buttons).map((e)=>{
          return(
            <button
              className="btn btn-success"
              onClick={props.buttons[e]}
              key={e}
            >
            {e.replace("_"," ")}
            </button>
          )})}
      </div>
      </div>
      <div className="modal-backdrop backdrop" />
    </div>
  )
}
export default ShowModal;
