import Server from './models/server'


const main = () => {
    const app = new Server( 4500 );

    app.listen();
}

// play ->
main();