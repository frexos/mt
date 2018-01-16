import React from 'react';
import './App.css';
import MyMapComponent from './components/googleMap';
import ShowModal from './components/modal'

class App extends React.Component {
  constructor(props){
    super(props);
    /*
     * @type {object}
     * @param {boolen} showMarker Render marker on google maps
     * @param {string} headerColor Background color of modal title
     */
    this.state={
      showMarker:true,
      headerColor:"#3399ff"
      };
    this.xmlToJson = this.xmlToJson.bind(this);
    this.fetchPositions = this.fetchPositions.bind(this);
    this.onMouseOverVessel = this.onMouseOverVessel.bind(this);
    this.onMouseOutOfVessel = this.onMouseOutOfVessel.bind(this);
    this.setInfo = this.setInfo.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showPastTrack = this.showPastTrack.bind(this);
    this.showRouteForecast = this.showRouteForecast.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }
  /*
   * Pops up the modal with declared values for title, body
   * and buttons with a functionality for each one.
   * @param {object} newModalValues Values to edit or replace
   * excisting ones.
   */
  showModal(newModalValues){
    this.setState({
      showModal:true,
      modal:Object.assign({
        title:`MMSI: ${this.state.lastPosition.pos.MMSI}`,
        body:this.state.infoText,
        buttons:{
          OK:()=>{
            this.setState({showModal:false});
          },
          Past_Track:()=>{
            this.setState({showModal:false});
            this.showPastTrack();
          },
          Route_Forecast:()=>{
            this.setState({showModal:false});
            this.showRouteForecast();
          }
        }
      },newModalValues)
    })
  }
 /*
  * Changes <i>xml</i> to JSON
  * @return {object} obj The converted Object
  */
  xmlToJson(xml) {
  	let obj = {};
  	if (xml.nodeType === 1) {
  		if (xml.attributes.length > 0) {
  		obj["pos"] = {};
  			for (let j = 0; j < xml.attributes.length; j++) {
  				let attribute = xml.attributes.item(j);
  				obj["pos"][attribute.nodeName] = attribute.nodeValue;
  			}
  		}
  	} else if (xml.nodeType === 3) {
  		obj = xml.nodeValue;
  	}
  	if (xml.hasChildNodes()
        && xml.childNodes.length === 1
        && xml.childNodes[0].nodeType === 3) {
  		      obj = xml.childNodes[0].nodeValue;
  	}
  	else if (xml.hasChildNodes()) {
  		for(let i = 0; i < xml.childNodes.length; i++) {
  			let item = xml.childNodes.item(i);
  			let nodeName = item.nodeName;
  			if (typeof(obj[nodeName]) === "undefined") {
  				obj[nodeName] = this.xmlToJson(item);
  			} else {
  				if (typeof(obj[nodeName].push) === "undefined") {
  					let old = obj[nodeName];
  					obj[nodeName] = [];
  					obj[nodeName].push(old);
  				}
  				obj[nodeName].push(this.xmlToJson(item));
  			}
  		}
  	}
  	return obj;
  }
  /*
   * Fetc data from marinetraffic API
   */
  async fetchPositions(){
    await fetch('https://services.marinetraffic.com/api/exportvesseltrack/cf8f05df0b57bfae43e762cc61fd381239c4c042/mmsi:240685000/days:1',{
          method: 'GET'
      })
      .then((suc)=> suc.text())
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then ((data)=> {
        let newJson = (this.xmlToJson(data));
        this.setState({
            allPositions:newJson.VESSELTRACK.POSITION,
            lastPosition:newJson.VESSELTRACK.POSITION[
              newJson.VESSELTRACK.POSITION.length-1],
            whatToRender:[newJson.VESSELTRACK.POSITION[
              newJson.VESSELTRACK.POSITION.length-1]]
          },()=>{
            this.setMarker();
            this.setInfo();
          });
      })
      .catch((error)=> {
          alert(error)
      })
  }
  /*
   * Sets the initial position of the marker
   */
  async setMarker(){
    await this.setState({
              lastLat:this.state.lastPosition.pos.LAT,
              lastLng:this.state.lastPosition.pos.LON
            });
  }
  /*
   * Sets the information for given position
   * @param {object} elem Given position
   */
  async setInfo(elem = this.state.lastPosition.pos){
          let infoText;
          if(!this.state.forecast){
             infoText = `Ship ID: ${elem.SHIP_ID} SPEED: ${elem.SPEED}
                  TIMESTAMP: ${elem.TIMESTAMP.replace("T"," ")}`;
          }else{
            infoText = "Upgrade to see track details";
          }
          await this.setState({infoText});
  }
  /*
   * Is invoked immediately before rendering
   */
  componentWillMount(){
    this.fetchPositions();
  }
  /*
   * handle right click event of the map
   * @param {SyntheticEvent} e
   */
  handleRightClick(e){
    if(e.nativeEvent.which === 3){
      this.setState({
        whatToRender:[this.state.lastPosition],
        forecast:false
      });
    }
  }
  /*
   * handle click event of the past track button of the modal.
   */
  showPastTrack(){
      let whatToRender=this.state.allPositions.filter((val,idx)=>{
          return idx % 2 === 0;
      });
      if((this.state.allPositions.length-1) % 2 !== 0){
        whatToRender.push(this.state.lastPosition);
      }
      this.setState({whatToRender, forecast:false});
  }
  /*
   * handle click event of the route forecast button of the modal
   */
  showRouteForecast(){
      let positions = this.state.allPositions;
      let whatToRender = [], idx = 0;
      whatToRender.push(positions[0])
      for (let i=1; i<positions.length; i++){
          if(Math.abs(Number(positions[i].pos.SPEED)
              - Number(positions[idx].pos.SPEED)) > 20
            || i -idx > 50){
            whatToRender.push(positions[i]);
            idx = i;
          }
      }
      this.setState({whatToRender, forecast:true})
  }
  /*
   * handle mouse over event of each marker of the map
   * @param {object} elem Data of each marker
   */
  async onMouseOverVessel(elem){
    await this.setInfo(elem);
    await this.setState({showInfo:true});
  }
  /*
   * handle mouse out event of each marker of the map
   */
  async onMouseOutOfVessel(){
    await this.setState({showInfo:false});
  }
  /*
   * render
   * @returns {ReactElement} markup.
   */
  render(){
    return(
      <div onMouseDown={this.handleRightClick}>
        {this.state.lastPosition &&
            <MyMapComponent
              showMarker={this.state.showMarker}
              whatToRender={this.state.whatToRender}
              position={{ lat: Number(this.state.lastLat) ,
                 lng: Number(this.state.lastLng) }}
              onMouseOverVessel ={this.onMouseOverVessel }
              onMouseOutOfVessel = {this.onMouseOutOfVessel}
              showInfo={this.state.showInfo}
              infoText={this.state.infoText}
              onMarkerClick = {this.showModal}
              handleRightClick={this.handleRightClick}
            />
          }
          {this.state.showModal ?
            <ShowModal
              buttons={this.state.modal.buttons}
              title={this.state.modal.title}
              body={this.state.modal.body}
              headerColor={this.state.headerColor}
            />
            :null
          }
      </div>
    )
  }
}
export default App;
