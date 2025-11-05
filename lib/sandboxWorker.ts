export interface ExecutionResult {
	success: boolean;
	output?: string;
	error?: string;
}

export function executeSandboxed(code: string, timeout: number = 5000): Promise<ExecutionResult> {
	return new Promise((resolve) => {
		const workerCode = `
			self.onmessage = function(e) {
				try {
					const logs = [];
					const console = {
						log: (...args) => {
							logs.push(args.map(arg => 
								typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
							).join(' '));
						},
						error: (...args) => {
							logs.push('ERROR: ' + args.map(arg => 
								typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
							).join(' '));
						},
						warn: (...args) => {
							logs.push('WARN: ' + args.map(arg => 
								typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
							).join(' '));
						}
					};
					const func = new Function('console', e.data);
					func(console);

					self.postMessage({ 
						success: true, 
						output: logs.join('\\n') || 'Execution completed (no output)' 
					});
				} catch (error) {
					self.postMessage({ 
						success: false, 
						error: error.message || String(error)
					});
				}
			};
		`;
		
		const blob = new Blob([workerCode], { type: 'application/javascript' });
		const worker = new Worker(URL.createObjectURL(blob));

		const timeoutId = setTimeout(() => {
			worker.terminate();
			resolve({
				success: false,
				error: `Execution timeout (exceeded ${timeout}ms)`
			});
		}, timeout);
		
		worker.onmessage = (e: MessageEvent<ExecutionResult>) => {
			clearTimeout(timeoutId);
			worker.terminate();
			URL.revokeObjectURL(blob as any);
			resolve(e.data);
		};
		
		worker.onerror = (error) => {
			clearTimeout(timeoutId);
			worker.terminate();
			URL.revokeObjectURL(blob as any);
			resolve({
				success: false,
				error: error.message || 'Worker error occurred'
			});
		};

		worker.postMessage(code);
	});
}
