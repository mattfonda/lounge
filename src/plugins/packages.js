"use strict";

const fs = require("fs");
const Helper = require("../helper");
const colors = require("colors/safe");

const that = this;
const customCss = [];

module.exports = that;

fs.readdir(Helper.getPackagesPath(), (err, packages) => {
	if (err) {
		return;
	}
	packages
		.map(getModuleInfo)
		.filter((packageFile) => packageFile.type === "package")
		.forEach((packageFile) => {
			console.log("Running package " + packageFile.name); // TODO: remove
			packageFile.run(that);
		});
});

that.addCustomCss = function(filename, packageName) { // TODO: Figure out a better way to pass the packageName, the package shouldn't have to send it
	customCss.push(packageName + "/" + filename);
};

that.getCustomCss = function() { // TODO: This probably? Shouldn't be available to the modules...that doesn't sound ideal
	return customCss;
};

// TODO: Duplication! Get rid of
function getModuleInfo(packageName) {
	let module;
	try {
		module = require(Helper.getPackageModulePath(packageName));
	} catch (e) {
		log.warn(`Specified package ${colors.yellow(packageName)} is not installed in packages directory`);
		return;
	}
	if (!module.lounge) {
		log.warn(`Specified package ${colors.yellow(packageName)} doesn't have required information.`);
		return;
	}
	return module.lounge;
}
