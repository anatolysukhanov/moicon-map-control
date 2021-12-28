(() => {
    const action = () => {
        /**
         * This is an example of how you could do the redirection in your application.
         * You could make backend calls here, compare data from a cookie, etc, anything is possible.
         */

        const page = framework.page;
        if (page === '/app')// if unauthenticated access is not allowed:
        {
            framework.backend.openIfUnauthenticated('/');// <-- redirects you if you are unauthenticated
        }
        else if (page !== '/logout')// if authenticated access should be redirected:
        {
            framework.backend.openIfAuthenticated('/app');// <-- redirects you if you are authenticated
        }
        framework.backend.getServer
        (
            (error) => {
            },
            (server) => {
                if (server.isAuthenticated()) {
                    const userId = server.getAuthenticatedUserId();
                    if (window.appReduxStore) {
                        window.appReduxStore.dispatch(USER_ID_ACTION(userId));
                    }
                }
            }
        );
    };

    framework.onstatechange(action);
    framework.backend.onauthchange(action);
})();
