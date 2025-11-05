export function executeBrainfuck(code: string, input: string = ""): string {
	const memory = new Uint16Array(30000);
	let pointer = 0;
	let codePointer = 0;
	let inputPointer = 0;
	let output = "";

	const maxSteps = 100000000;
	let steps = 0;

	const cleanCode = code
		.split("")
		.filter((c) => "><+-.,[]".includes(c))
		.join("");

	const loopMap = new Map<number, number>();
	const loopStack: number[] = [];

	for (let i = 0; i < cleanCode.length; i++) {
		if (cleanCode[i] === "[") {
			loopStack.push(i);
		} else if (cleanCode[i] === "]") {
			if (loopStack.length === 0) {
				throw new Error(`Unmatched ] at position ${i}`);
			}
			const start = loopStack.pop()!;
			loopMap.set(start, i);
			loopMap.set(i, start);
		}
	}

	if (loopStack.length > 0) {
		throw new Error(`Unmatched [ at position ${loopStack[0]}`);
	}

	while (codePointer < cleanCode.length && steps < maxSteps) {
		steps++;
		const command = cleanCode[codePointer];

		if (command == ">") {
			pointer = (pointer + 1) % 30000;
		} else if (command == "<") {
			pointer = (pointer - 1 + 30000) % 30000;
		} else if (command == "+") {
			memory[pointer] = (memory[pointer] + 1) & 0xffff;
		} else if (command == "-") {
			memory[pointer] = (memory[pointer] - 1) & 0xffff;
		} else if (command == ".") {
			output += String.fromCharCode(memory[pointer]);
		} else if (command == ",") {
			if (inputPointer < input.length) {
				memory[pointer] = input.charCodeAt(inputPointer++);
			} else {
				throw new Error("Input exhausted");
			}
		} else if (command == "[") {
			if (memory[pointer] === 0) {
				codePointer = loopMap.get(codePointer)!;
			}
		} else if (command == "]") {
			if (memory[pointer] !== 0) {
				codePointer = loopMap.get(codePointer)!;
			}
		}

		codePointer++;
	}

	if (steps >= maxSteps) {
		throw new Error("Execution limit exceeded (possible infinite loop)");
	}

	return output;
}
