import {Point,Line,LinearChart,ClampChart,TrendChart,PolyChart,ChartTableEntry,ChartTable,ChartInput,ChartScript,ChartConstant} from './ChartObjects';

export default class ChartProject{
	constructor(){
		const O=true;
		const F=false;
		const T=this;
		const P=(x,y)=>{return new Point(x,y);};
		const L=(val,...points)=>{return new Line(points,val);};
		T._$1=new ChartConstant('zero',0);
		T.$operatingWeight=new ChartInput('operatingWeight','exit double(input);','95000');
		T.$fuelTakeoffWeight=new ChartInput('fuelTakeoffWeight','exit double(input);','30000');
		T.$cargoWeight=new ChartInput('cargoWeight','exit double(input);','0');
		T.$fuelLandingWeight=new ChartInput('fuelLandingWeight','exit double(input);','12000');
		T._$6=new ChartScript('grossWeight','exit operatingWeight+fuelTakeoffWeight+cargoWeight;');
		T._$7=new ChartScript('landingGrossWeight','exit operatingWeight+fuelLandingWeight+cargoWeight;');
		T._$8=new ChartScript('zeroFuelWeight','exit operatingWeight+cargoWeight;');
		T.$externalFuelforwardCG=new LinearChart('externalFuelforwardCG',O,T._$6,T._$1,L(0,P(26.813,174990.853),P(24.815,158087.342),P(23.023,143364.138),P(21.926,134688.733),P(20.884,127810.283),P(19.995,123129.834),P(19.032,118682.115),P(18.089,115501.478),P(17.818,114458.825),P(16.771,108852.63),P(15.531,103039.564),P(15.06,100970.858),P(15.047,69501.234)));
		T.$externalFuelAftCG=new LinearChart('externalFuelAftCG',O,T._$6,T._$1,L(0,P(29.104,175001.479),P(29.092,150482.045),P(29.122,131863.684),P(29.978,127698.22),P(29.984,114949.377),P(29.11,105356.187),P(28.375,97814.174),P(27.513,89861.924),P(26.989,85444.008),P(26.061,78533.125),P(25.331,73957.427),P(24.699,69918.189)));
		T.$noExternalFuelForwardCG=new LinearChart('noExternalFuelForwardCG',O,T._$6,T._$1,L(0,P(15.047,69501.234),P(15.06,100970.858),P(15.531,103039.564),P(16.771,108852.63),P(18.394,117932.14),P(19.932,127760.903),P(21.189,137156.68),P(22.496,148241.099),P(23.67,159282.22),P(24.629,168894.49),P(25.225,175086.178)));
		T.$noExternalFuelAftCG=new LinearChart('noExternalFuelAftCG',O,T._$6,T._$1,L(0,P(24.699,69918.189),P(25.331,73957.427),P(26.061,78533.125),P(26.989,85444.008),P(27.513,89861.924),P(28.375,97814.174),P(29.11,105356.187),P(29.984,114949.377),P(29.978,127698.22),P(29.995,175012.734)));
		T.$operatingArea=new PolyChart('operatingArea',T.$fuelTakeoffWeight,T._$8,L(0,P(-121.984,102094.804),P(2228.694,102119.533),P(13784.132,113370.955),P(31352.356,120171.265),P(42957.281,108548.917),P(53949.933,101106.062),P(60551.976,94434.865),P(60537.305,79670.259),P(-98.537,79660.76)),L(1,P(-121.984,102094.804),P(2228.694,102119.533),P(13784.132,113370.955),P(31352.356,120171.265),P(42957.281,108548.917),P(53949.933,101106.062),P(43029.506,111996.042),P(28015.745,126965.57),P(24972.236,130007.164),P(21433.847,130031.892),P(14307.581,123478.866),P(4632.686,114255.173),P(2356.24,112153.259),P(-68.669,112153.259)),L(2,P(-68.669,112153.259),P(2356.24,112153.259),P(4632.686,114255.173),P(14307.581,123478.866),P(21433.847,130031.892),P(24972.236,130007.164),P(28015.745,126965.57),P(53949.933,101106.062),P(60525.811,94428.358),P(60567.247,103371.041),P(51392.316,112585.588),P(42308.225,121573.176),P(32610.959,131377.817),P(29136.294,134850.294),P(21051.454,134872.99),P(12164.698,132937.567),P(2306.751,128376.906),P(-135.453,128376.906)),L(3,P(40013.038,134889.69),P(60589.078,114232.036),P(60567.247,103371.041),P(51392.316,112585.588),P(42308.225,121573.176),P(32610.959,131377.817),P(29136.294,134850.294)));
		T._$14=new LinearChart('areaAMaxZFWTakeoff',F,T.$fuelTakeoffWeight,T._$1,L(0,P(-121.984,102094.804),P(2228.694,102119.533),P(13784.132,113370.955),P(31352.356,120171.265),P(42957.281,108548.917),P(53949.933,101106.062),P(60551.976,94434.865)));
		T.$areaAMaxZFWOverall=new ChartScript('areaAMaxZFWOverall','exit min(areaAMaxZFWTakeoff, runLinear("areaAMaxZFWTakeoff", fuelLandingWeight, 0));');
		T._$16=new LinearChart('areaBMaxZFWTakeoff',F,T.$fuelTakeoffWeight,T._$1,L(0,P(-68.669,112153.259),P(2356.24,112153.259),P(4632.686,114255.173),P(14307.581,123478.866),P(21433.847,130031.892),P(24972.236,130007.164),P(28015.745,126965.57),P(43029.506,111996.042),P(53949.933,101106.062),P(60607.369,94397.62)));
		T.$areaBMaxZFWOverall=new ChartScript('areaBMaxZFWOverall','exit min(areaBMaxZFWTakeoff, runLinear("areaBMaxZFWTakeoff", fuelLandingWeight, 0));');
		T._$18=new LinearChart('areaCMaxZFWTakeoff',F,T.$fuelTakeoffWeight,T._$1,L(0,P(-135.453,128376.906),P(2306.751,128376.906),P(12164.698,132937.567),P(21051.454,134872.99),P(29136.294,134850.294),P(32610.959,131377.817),P(42308.225,121573.176),P(51392.316,112585.588),P(60567.247,103371.041)));
		T.$areaCMaxZFWOverall=new ChartScript('areaCMaxZFWOverall','exit min(areaCMaxZFWTakeoff, runLinear("areaCMaxZFWTakeoff", fuelLandingWeight, 0));');
		T._$20=new LinearChart('areaDMaxZFWTakeoff',F,T.$fuelTakeoffWeight,T._$1,L(0,P(-165.173,128415.847),P(2335.646,128415.847),P(11917.437,132908.871),P(21021.543,134958.814),P(40013.038,134889.69),P(60589.078,114232.036),P(61006.064,113774.364)));
		T.$areaDMaxZFWOverall=new ChartScript('areaDMaxZFWOverall','exit min(areaDMaxZFWTakeoff, runLinear("areaDMaxZFWTakeoff", fuelLandingWeight, 0));');

		T.calcArray=[T._$1,T.$operatingWeight,T.$fuelTakeoffWeight,T.$cargoWeight,T.$fuelLandingWeight,T._$6,T._$7,T._$8,T.$externalFuelforwardCG,T.$externalFuelAftCG,T.$noExternalFuelForwardCG,T.$noExternalFuelAftCG,T.$operatingArea,T._$14,T.$areaAMaxZFWOverall,T._$16,T.$areaBMaxZFWOverall,T._$18,T.$areaCMaxZFWOverall,T._$20,T.$areaDMaxZFWOverall,];
	}

	calcInputs=()=>{
		const alerts=[];
		const notices=[];
		for (let obj of this.calcArray){
			if (obj.type==='input') obj.calc(this.calcArray, alerts, notices);
		}
		return [alerts, notices];
	};

	calc=()=>{
		const alerts=[];
		const notices=[];
		for (let obj of this.calcArray){
			obj.calc(this.calcArray, alerts, notices);
		}
		return [alerts, notices];
	};
}