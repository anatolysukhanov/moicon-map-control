// $(() =>
// {
// 	framework.backend.apiCallWithinStatePromise('GetRoute', {companyId:framework.config.companyId, routeId:1}).then(OUT =>
// 	{
// 		console.log(OUT);
// 	}).catch((error) =>
// 	{
// 		console.error(error);
// 	});
// });


// framework.backend.onbroadcast
// (
// 	'GetRoutesBeingDrivenData_' + framework.config.companyId,
//
// 	(message) =>
// 	{
// 		console.log(message);
// 	},
//
// 	(resolve, reject, firstRun) =>
// 	{
// 		console.log('websocket connected');
// 		framework.backend.apiCallWithinStatePromise('GetRoutesBeingDrivenData', {companyId:framework.config.companyId}).then(OUT =>
// 		{
// 			console.log(OUT);
// 			resolve();
// 		}).catch((error) =>
// 		{
// 			console.error(error);
// 			reject(error);
// 		});
// 	},
// );


// framework.backend.onclientbroadcast
// (
// 	'GetRoutesBeingDrivenData_' + framework.config.companyId,
//
// 	(message) =>
// 	{
// 		console.log(message);
// 	},
//
// 	(resolve, reject, firstRun) =>
// 	{
// 		console.log('websocket connected');
// 		resolve();
// 	},
// );
//
// setTimeout(() =>
// {
// 	framework.backend.clientbroadcast('GetRoutesBeingDrivenData_' + framework.config.companyId, {'test':'data'});
// }, 5000);
