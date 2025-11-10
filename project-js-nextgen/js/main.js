// Import demo functions
import { demoVariables, demoArrowFunctions, demoTemplateLiterals } from './app.js';

// Fungsi utama untuk menjalankan semua demo
function runAllDemos() {
  // Demo Let dan Const
  const varResults = demoVariables();
  addOutput(
    "1. Let dan Const",
    "var vs let/const dan block scope",
    `var (function scope): ${varResults.oldVar}
let (block scope): ${varResults.newLet}
const (immutable): ${varResults.PI}
const object (mutable content): ${JSON.stringify(varResults.user)}`
  );

  // Demo Arrow Functions
  const arrowResults = demoArrowFunctions();
  addOutput(
    "2. Arrow Functions",
    "Perbandingan fungsi reguler dan arrow functions",
    `Regular function: ${arrowResults.regularSum}
Arrow function: ${arrowResults.arrowSum}
Short arrow: ${arrowResults.shortArrowSum}
No params: ${arrowResults.sayHello}
Single param: ${arrowResults.square}`
  );

  // Demo Template Literals
  const templateResults = demoTemplateLiterals();
  addOutput(
    "3. Template Literals",
    "String concatenation vs template literals",
    `Old way: ${templateResults.oldWay}
New way: ${templateResults.newWay}
With expression: ${templateResults.expression}
Multi-line: ${templateResults.multiLine}`
  );
}