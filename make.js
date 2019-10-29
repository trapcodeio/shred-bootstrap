/**
 * This file auto generates utility files from bootstrap
 * and adds the main.scss file to them.
 */

/**
 * Node File System
 * @type {module:fs}
 */
const fs = require("fs");
/**
 * Node Path
 * @type {module:path}
 */
const path = require("path");
/**
 * Node Os
 * @type {module:os}
 */
const os = require("os");

/**
 * If `node make.js replace` is used,
 * file will be overwritten if exists
 * @type {boolean}
 */
const replace = process.argv[2] === "replace";

/**
 * Read Files in directory
 * node_modules/bootstrap/scss/utilities
 */
const utilitiesFolder = "node_modules/bootstrap/scss/utilities";
const utilities = fs.readdirSync(utilitiesFolder);
let existingUtilities = [];

for (let utility of utilities) {
    // Remove _ in front of file names.
    utility = utility.substring(1);
    // Utility Path
    const newUtilityPath = path.resolve('utilities/' + utility);
    // If can create new file.
    let canCreate = true;

    // if new file exists and !replace then we set canCreate to false.
    if (!replace && fs.existsSync(newUtilityPath)) {
        canCreate = false;
        existingUtilities.push(utility);
    }

    // create if canCreate
    if (canCreate) {
        fs.writeFileSync(newUtilityPath, `
        @import "../main";${os.EOL}@import "../node_modules/bootstrap/scss/utilities/${utility}";
        `.trim())
    }
}

if (existingUtilities.length) {
    console.log(
        "These utilities already exists and where not replaced:",
        existingUtilities,
        `Use "node make.js replace" to replace existing files.`
    )
}
