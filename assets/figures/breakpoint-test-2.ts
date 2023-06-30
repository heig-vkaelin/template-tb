export const options: Options = {
	scenarios: {
		Breakpoint_test: {
			executor: 'ramping-arrival-rate',
			preAllocatedVUs: 1000,
			stages: [
				{ duration: '5m', target: 1000 },
			],
		},
	},
	thresholds: {
		ws_connecting: [{ threshold: 'p(95)<1200', abortOnFail: true }],
	},
};
