const prisma = require("./src/db");
const fs = require("node:fs");
const path = require("path");

async function run() {
    const schema = fs.readFileSync(path.join(__dirname, "prisma/schema.prisma"), "utf8")

    const tables = await get_tables(schema);

    const order = buildTree(tables);

    console.log("[DB] Fetching data...")
    await createInsertions(tables);
    console.log("[DB] Data fetched");

    exportDataToFile(tables, order)
}

function exportDataToFile(tables, order) {
    let finalString = createDatabaseClear(order);
    finalString += `\n`;
    for (const table_name of order.reverse()) {
        finalString += tables[table_name]?.insertion;
    }

    const file_path = path.join(__dirname, "prisma/fullData.sql");

    fs.truncateSync(file_path)
    fs.writeFileSync(file_path, finalString);
}

function createDatabaseClear(order) {
    let str = "";
    for (const table_name of order.reverse()) {
        str += "DELETE FROM " + table_name + ";\n";
    }
    return str;
}

async function createInsertions(tables) {
    const actions = Object.entries(tables).map(async ([key, table]) => {
        table.insertion = await createInsertDatas(key);
    })

    await Promise.all(actions);
}

/**
 * Create a `INSERT INTO` query with the data fetched from the database
 * @param {string} table_name
 * @returns {Promise<string>} Either the `INSERT INTO` query or an empty string if there is no data;
 */
async function createInsertDatas(table_name) {
    const name = toCamelCase(table_name);
    const data = await prisma.$queryRawUnsafe(`SELECT *
                                               FROM ${name};`);

    if (data.length < 1) {
        return ""
    }

    const keys = Object.keys(data[0]);
    let str = `INSERT INTO ${name} (${keys.map(k => "`" + k + "`").join(", ")})
               VALUES`

    const rows = data.map((obj) => keys.map((k) => formatDataToSql(obj[k])).join(", "));

    str += rows.map((r) => `(${r})`).join(",");
    str += ";\n"

    return str;
}

function isDecimal(objet) {
    return (
        typeof objet === 'object' &&
        objet !== null &&
        typeof objet.toFixed === 'function'
    );
}

function formatDataToSql(e) {
    if (typeof e === "number" || typeof e === "boolean") {
        return e;
    } else if (isDecimal(e)) {
        return e.toNumber();
    } else if (typeof e === "undefined" || e === null) {
        return `NULL`;
    } else if (e instanceof Date) {
        return `'${e.toISOString().slice(0, 19).replace('T', ' ')}'`;
    } else if (typeof e === "string") {
        return `'${e.replace(/'/g, '\\')}'`;
    } else if (typeof e === 'object') {
        return `'${JSON.stringify(e)}'`
    }
    return e;
}

/**
 * Get all tables in the database
 * @param {string} schema
 * @returns {Promise<{dependencies: string[]}[]>}
 */
async function get_tables(schema) {
    const models = schema.match(/model\s*(\w+)\s*{[^}]+}/gm)
    console.log(`[PARSER] ${models.length} tables found`);

    const tables = {};

    models.forEach((raw) => {
        const match = raw.match(/model\s*(\w+)\s*{([^}]+)}/);
        const name = match[1];
        const rows = match[2].split(/\n+/g);

        tables[name] = {dependencies: [], rows}
    })

    const table_names = Object.keys(tables)

    Object.entries(tables).map(([name, model]) => {
        tables[name].dependencies = getDependenciesForSchema(model.rows, table_names);
        delete tables[name].rows;
    })

    return tables;
}

/**
 * @param {string[]} model_schema
 * @param {string[]} table_names
 * @return {string[]}
 */
function getDependenciesForSchema(model_schema, table_names) {
    const dependencies = [];
    const REGEX = /^\s*(\w+)\s*(\w+)\s*@relation\(([^)]+)\)\s*/gm;

    const matches = model_schema.filter((l) => REGEX.test(l));

    matches.forEach((m) => {
        const match = m.trim().split(/\s+/g)

        const model_name = match[1];
        if (table_names.includes(model_name)) {
            dependencies.push(model_name);
        } else {
            console.error(`[PARSER] ${model_name} not found in the tables`);
            process.exit(1);
        }
    })

    return dependencies;
}

/**
 * @param {Array<{dependencies: string[]}>} tables
 * @return {string[]}
 */
function buildTree(tables) {
    let order = [];
    let table_names = Object.keys(tables);

    /**
     * @param {string} name The name of the table
     * @param {string|null} from The table from which it was called
     */
    function add_table(name, from = null) {
        if (order.includes(name)) return;

        const dependencies = tables[name]?.dependencies;

        if (dependencies.length < 1) order.push(name);
        else {
            dependencies.forEach(dependency_name => {
                add_table(dependency_name, name);
            });

            order.push(name);
        }
    }

    for (const name of table_names) {
        add_table(name, null);
    }

    return order;
}

/**
 * Transform a string from an UpperCamelCase to a LowerCamelCase
 * @param {string} str
 * @return {string}
 * @example
 * ```js
 * toCamelCase("UserKartingSession") // Return "userKartingSession"
 * ```
 */
function toCamelCase(str) {
    return str[0].toLowerCase() + str.slice(1);
}

// Run the tool
run().then(
    () => {
        console.log("Database exported successfully");
        process.exit(0);
    },
    (err) => {
        console.error(err);
        process.exit(1);
    }
)
