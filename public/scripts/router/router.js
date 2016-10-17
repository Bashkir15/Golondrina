module.exports = function middleware(router) {
	var directorRouter = router.directorRouter;

	return function middleware(req, res, next) {
		directorRouter.attach(() => {
			this.next = next;
		});

		directorRouter.dispatch(req, res, (err) => {
			if (err && err.status === 404) {
				next();
			}
		});
	};
};