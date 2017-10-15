/**
 * Author: Christopher Kraenzle
 */
"use strict";

class Data {
	constructor() {
		this.data = [];
    this.country = [];
    this.year = [];
	}
	processData(d) {
		return {
			wp5country: d["wp5country"],
			country: d["country"],
			year: +d["year"],
			lifeladder: +d["lifeLadder"],
			gdpPerCapita: +d["gdpPerCapita"],
			social: +d["social"],
			lifeExpect: +d["lifeExpect"],
			freedom: +d["freedom"],
			generosity: +d["generosity"],
			corruption: +d["corruption"],
			pos: +d["pos"],
			neg: +d["neg"],
			govConf: +d["govConf"],
			demQual: +d["demQual"],
			delQual: +d["delQual"],
			stdDevLadder: +d["stdDevLadder"],
			stdDevLadMean: +d["stdDevLadMean"],
			giniIndex: +d["giniIndex"],
			giniIndex00_13: +d["giniIndex00_13"],
			householdIncome: +d["householdIncome"],
			peopleTrust: +d["peopleTrust"],
			peopleTrust81_84: +d["peopleTrust81_84"],
			peopleTrust89_93: +d["peopleTrust89_93"],
			peopleTrust94_98: +d["peopleTrust94_98"],
			peopleTrust99_04: +d["peopleTrust99_04"],
			peopleTrust05_09: +d["peopleTrust05_09"],
			peopleTrust10_14: +d["peopleTrust10_14"]
		}
	}
	loadHappy(file, callback) {
		d3.csv(file, this.processData, data=>{
			this.data = data;
      this.uniqueCountryList();
      this.uniqueYearList();
			callback();
		});
	}
	
	uniqueCountryList() {
		const getCountryList = (array, n) => array.map(x => x[n]);
		const countries = getCountryList(this.data, "country");
		this.country = [...new Set(countries)];
	}
  
  uniqueYearList() {
    const getYearList = (array,n) => array.map(x=> x[n]);
    const years = getYearList(this.data, "year");
    this.year = [...new Set(years)];
	}
	getDataByYear(year) {
		let d = [];
		let count = 0;
		this.data.forEach((row)=>{
			if (row.year==year) {
				count++;
				d.push({ "x": count, "y": row.lifeladder, "country": row.country });
			}
		});
		return d;
	}
}
