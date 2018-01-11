const statusMessage = [
	'Under way using engine',
	'at anchor',
	'not under command ',
	'restricted maneuverability',
	'constrained by her draught',
	'moored',
	'aground ',
	'engaged in fishing',
	'under way sailing',
	'reserved for future amendment of navigational status for ships carrying DG, HS, or MP, or IMO hazard or pollutant category C, high-speed craft (HSC)',
	'reserved for future amendment of navigational status for ships carrying dangerous goods (DG), harmful substances (HS) or marine pollutants (MP), or IMO hazard or pollutant category A, wing in ground (WIG)',
	'power-driven vessel towing astern (regional use)',
	'power-driven vessel pushing ahead or towing alongside (regional use)',
	'reserved for future use',
	'AIS-SART (active), MOB-AIS, EPIRB-AIS',
	'undefined = default (also used by AIS-SART, MOB-AIS and EPIRB-AIS under test)'
];

const Status = (statusNo) => {
	return statusMessage[statusNo];
}

const Time = (time) => {
	return new Date(time).toString();
}

const Speed = (speed) => {
	return speed + ' (in knots x10)';
}

export {Status, Time, Speed};