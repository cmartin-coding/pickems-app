import { create } from "twrnc";

// create the customized version...
const tw = create(require(`./tailwind.config.js`)); // <- your path may differ
export default tw;
